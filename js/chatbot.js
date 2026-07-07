fetch("components/chatbot.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("chatbot-container").innerHTML = html;
    initializeChatbot();
  });

function initializeChatbot(){
  const chatToggle = document.getElementById("chatToggle");
  const chatBox = document.getElementById("chatBox");
  const closeChat = document.getElementById("closeChat");

  function openChat(){
    chatBox.classList.add("is-open");
  }

  function closeChatWindow(){
    chatBox.classList.remove("is-open");
  }

  chatToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    chatBox.classList.contains("is-open") ? closeChatWindow() : openChat();
  });

  closeChat.addEventListener("click", (e) => {
    e.stopPropagation();
    closeChatWindow();
  });

  chatBox.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    closeChatWindow();
  });
}

function chatReply(type){
  const replies = {
    research: {
      title: "Research",
      text: "My research focuses on brain-inspired AI, computer vision, recurrent bottom-up/top-down learning, hybrid CNN–SNN architectures, biologically plausible learning, and reliable deep learning."
    },

    projects: {
      title: "Projects",
      text: "My projects include recurrent task-guided gain modulation, event-based human pose estimation, maritime AI verification and validation, digital twins, RAG systems, and protein modeling."
    },

    publications: {
      title: "Publications",
      text: "My current work includes a manuscript under review at IEEE TETCI on recurrent task-guided gain modulation for biologically inspired bottom-up/top-down learning, along with prior publications and preprints in data science, NoSQL systems, and cybersecurity information sharing."
    },

    experience: {
      title: "Experience",
      text: "I have experience across Indiana University Indianapolis, Purdue University, Cove Island/UrsaLeo, iVedha, and direct collaboration with the National Bank of Canada on enterprise monitoring and cloud observability platforms."
    },

    internship: {
      title: "Internships",
      text: "I am seeking Summer 2027 internships in AI/ML, computer vision, deep learning, brain-inspired AI, and applied machine learning systems."
    }
  };

  const reply = replies[type];

  document.getElementById("chatResponse").innerHTML = `
    <div class="chat-response-title">${reply.title}</div>
    <p class="chat-response-text">${reply.text}</p>
  `;
}