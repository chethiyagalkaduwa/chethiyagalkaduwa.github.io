
/* ==========================================
   CHETHIYA AI CHATBOT
   NVIDIA NIM + CLOUDFLARE WORKER
   Polished UI + Markdown + Typewriter
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const API_URL =
    "https://chethiya-chat-api.chethiya-ai.workers.dev/chat";

  const toggle = document.getElementById("chatToggle");
  const closeBtn = document.getElementById("closeChat");
  const box = document.getElementById("chatBox");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const send = document.getElementById("chatSend");
  const messagesBox = document.getElementById("chatMessages");
  const typing = document.getElementById("chatTyping");

  const suggestions = document.querySelectorAll(
    "#chatSuggestions button[data-prompt]"
  );

  if (!toggle || !box || !form || !input ||
      !send || !messagesBox || !typing) {
    console.error("Chatbot HTML elements are missing.");
    return;
  }

  let history = [];
  let isLoading = false;

  // ==========================================
  // OPEN / CLOSE
  // ==========================================

  
  function openChat() {
    box.hidden = false;

    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close AI assistant");

    // Focus the close button instead of the text input.
    // Prevents the iPhone keyboard opening automatically.
    closeBtn.focus({ preventScroll: true });

    scrollToBottom();
  }


  function closeChat() {
    box.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }

  toggle.addEventListener("click", () => {
    box.hidden ? openChat() : closeChat();
  });

  closeBtn.addEventListener("click", closeChat);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !box.hidden) {
      closeChat();
    }
  });

  // ==========================================
  // CHAT MESSAGES
  // ==========================================

  function scrollToBottom() {
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function createMessage(role) {
    const wrapper = document.createElement("div");
    wrapper.className = `chat-message ${role}`;

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";

    wrapper.appendChild(bubble);
    messagesBox.appendChild(wrapper);

    scrollToBottom();

    return bubble;
  }

  function addPlainMessage(text, role) {
    const bubble = createMessage(role);
    bubble.textContent = text;
    return bubble;
  }

  // ==========================================
  // SAFE MARKDOWN RENDERING
  // Supports bold, links, code, headings,
  // numbered lists and bullet lists.
  // Does not execute HTML from model output.
  // ==========================================

  function appendLink(parent, label, href) {
    try {
      const url = new URL(href);

      if (!["https:", "http:"].includes(url.protocol)) {
        throw new Error("Unsafe link protocol");
      }

      const link = document.createElement("a");
      link.href = url.href;
      link.textContent = label;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      parent.appendChild(link);

    } catch {
      parent.appendChild(document.createTextNode(label));
    }
  }

  function appendInline(parent, value) {
    const pattern =
      /\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|`([^`]+)`|(https?:\/\/[^\s<)]+)/g;

    let last = 0;
    let match;

    while ((match = pattern.exec(value)) !== null) {

      if (match.index > last) {
        parent.appendChild(
          document.createTextNode(
            value.slice(last, match.index)
          )
        );
      }

      if (match[1] !== undefined) {
        const strong = document.createElement("strong");
        strong.textContent = match[1];
        parent.appendChild(strong);

      } else if (match[2] !== undefined) {
        appendLink(parent, match[2], match[3]);

      } else if (match[4] !== undefined) {
        const code = document.createElement("code");
        code.textContent = match[4];
        parent.appendChild(code);

      } else if (match[5] !== undefined) {
        appendLink(parent, match[5], match[5]);
      }

      last = pattern.lastIndex;
    }

    if (last < value.length) {
      parent.appendChild(
        document.createTextNode(value.slice(last))
      );
    }
  }

  function renderMarkdown(markdown, bubble) {
    const lines = markdown
      .replace(/\r\n/g, "\n")
      .split("\n");

    const isList = line =>
      /^\s*(?:\d+\.\s+|[-*]\s+)/.test(line);

    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();

      if (!line) {
        i++;
        continue;
      }

      // Headings
      const heading = line.match(/^(#{1,3})\s+(.+)$/);

      if (heading) {
        const element = document.createElement("h4");
        appendInline(element, heading[2]);
        bubble.appendChild(element);
        i++;
        continue;
      }

      // Numbered and unordered lists
      if (isList(line)) {
        const ordered = /^\d+\.\s+/.test(line);
        const list = document.createElement(
          ordered ? "ol" : "ul"
        );

        while (i < lines.length) {
          const current = lines[i].trim();

          const match = ordered
            ? current.match(/^\d+\.\s+(.+)$/)
            : current.match(/^[-*]\s+(.+)$/);

          if (!match) break;

          const item = document.createElement("li");
          appendInline(item, match[1]);
          list.appendChild(item);
          i++;
        }

        bubble.appendChild(list);
        continue;
      }

      // Paragraphs
      const paragraphLines = [];

      while (i < lines.length) {
        const current = lines[i].trim();

        if (!current || isList(current) ||
            /^#{1,3}\s+/.test(current)) {
          break;
        }

        paragraphLines.push(current);
        i++;
      }

      if (paragraphLines.length) {
        const paragraph = document.createElement("p");
        appendInline(
          paragraph,
          paragraphLines.join(" ")
        );
        bubble.appendChild(paragraph);
      }
    }
  }

  // ==========================================
  // TYPEWRITER WRITING EFFECT
  // Reveals already formatted text progressively.
  // Keeps bold text, lists and links intact.
  // ==========================================

  function typewriter(bubble, reply) {

    renderMarkdown(reply, bubble);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      scrollToBottom();
      return Promise.resolve();
    }

    const walker = document.createTreeWalker(
      bubble,
      NodeFilter.SHOW_TEXT
    );

    const parts = [];
    let node;

    while ((node = walker.nextNode())) {
      if (!node.textContent) continue;

      let block = node.parentElement;

      while (block && block.parentElement !== bubble) {
        block = block.parentElement;
      }

      parts.push({
        node,
        text: node.textContent,
        block,
        item: node.parentElement.closest("li")
      });
    }

    const total = parts.reduce(
      (sum, part) => sum + part.text.length,
      0
    );

    if (!total) return Promise.resolve();

    // Hide future paragraphs and list items
    // until their text is being written.
    Array.from(bubble.children).forEach(element => {
      element.hidden = true;
    });

    bubble.querySelectorAll("li").forEach(item => {
      item.hidden = true;
    });

    parts.forEach(part => {
      part.node.textContent = "";
    });

    // Blinking cursor follows the written text.
    const caret = document.createElement("span");
    caret.className = "chat-writing-caret";
    caret.setAttribute("aria-hidden", "true");

    return new Promise(resolve => {
      let start = null;
      let previousCount = -1;

      // At least 220 characters per second.
      // Long messages finish within about 6 seconds.
      const speed = Math.max(0.22, total / 6000);

      function frame(timestamp) {
        if (start === null) start = timestamp;

        const count = Math.min(
          total,
          Math.max(
            1,
            Math.floor((timestamp - start) * speed)
          )
        );

        if (count !== previousCount) {
          let remaining = count;
          let active = null;

          for (const part of parts) {
            const visible = Math.max(
              0,
              Math.min(part.text.length, remaining)
            );

            if (part.node.textContent.length !== visible) {
              part.node.textContent =
                part.text.slice(0, visible);
            }

            if (visible > 0) {
              if (part.block) part.block.hidden = false;
              if (part.item) part.item.hidden = false;
              active = part.node;
            }

            remaining -= visible;
          }

          if (active) {
            active.after(caret);
          }

          scrollToBottom();
          previousCount = count;
        }

        if (count < total) {
          requestAnimationFrame(frame);
        } else {
          caret.remove();
          scrollToBottom();
          resolve();
        }
      }

      requestAnimationFrame(frame);
    });
  }

  // ==========================================
  // LOADING STATE
  // ==========================================

  function setLoading(value) {
    isLoading = value;
    typing.hidden = !value;
    input.disabled = value;
    send.disabled = value;

    suggestions.forEach(button => {
      button.disabled = value;
    });

    scrollToBottom();
  }

  // ==========================================
  // SEND TO NVIDIA NIM
  // ==========================================

  async function sendMessage(question) {
    question = question.trim();

    if (!question || isLoading) return;

    addPlainMessage(question, "user");
    input.value = "";

    setLoading(true);

    const outgoingMessages = [
      ...history.slice(-6),
      {
        role: "user",
        content: question
      }
    ];

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 90000);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: outgoingMessages
        }),
        signal: controller.signal
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "AI service unavailable."
        );
      }

      if (
        typeof data.reply !== "string" ||
        !data.reply.trim()
      ) {
        throw new Error("Empty AI response.");
      }

      // Stop the thinking animation, then
      // start writing the response.
      typing.hidden = true;

      const bubble = createMessage("assistant");

      await typewriter(bubble, data.reply);

      history = [
        ...outgoingMessages,
        {
          role: "assistant",
          content: data.reply.slice(0, 2000)
        }
      ].slice(-8);

    } catch (error) {

      let message =
        "Sorry, something went wrong. Please try again.";

      if (error.name === "AbortError") {
        message = "The request timed out. Please try again.";
      } else if (error instanceof TypeError) {
        message = "Unable to connect to the AI service.";
      } else if (error.message) {
        message = error.message;
      }

      addPlainMessage(message, "assistant");
      console.error("Chatbot error:", error);

    } finally {
      clearTimeout(timeout);
      setLoading(false);

      if (!box.hidden) input.focus();
    }
  }

  // ==========================================
  // FORM AND SUGGESTIONS
  // ==========================================

  form.addEventListener("submit", event => {
    event.preventDefault();
    sendMessage(input.value);
  });

  suggestions.forEach(button => {
    button.addEventListener("click", () => {
      sendMessage(button.dataset.prompt || "");
    });
  });

});
