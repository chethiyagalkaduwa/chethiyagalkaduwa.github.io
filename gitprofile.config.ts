// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'chey97', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {

    github: {
      display: true, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'manual', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 6, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: [
        'chey97/django-drf-ecommerce ',
        'chey97/miniGPT',
        'chey97/django-drf-channels-react-project-Chat ',
        'chey97/ProteinSeq_Classifier ',
        'chey97/DNASeq-Classifier ',
        'chey97/HandTrackingModule  ',
        'chey97/simpleBOT  ',
        'chey97/GesturePlayPauseControl--AppleScript  ',
      ],
      },
    },
    // external: {
    //   header: 'My Projects',
    //   // To hide the `External Projects` section, keep it empty.
    //   projects: [
    //     {
    //       title: 'Project Name',
    //       description:
    //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
    //       imageUrl:
    //         'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
    //       link: 'https://example.com',
    //     },
    //     {
    //       title: 'Project Name',
    //       description:
    //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
    //       imageUrl:
    //         'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
    //       link: 'https://example.com',
    //     },
    //   ],
    // },
  },
  seo: {
    title: 'Chethiya Galkaduwa',
    description: 'Portfolio of Chethiya Galkaduwa',
    imageURL: '',
  },
  social: {
    linkedin: 'chethiya-galkaduwa',
    twitter: '',
    mastodon: '',
    researchGate: 'Chethiya-Galkaduwa',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '', // example: 'pewdiepie'
    udemy: '',
    dribbble: '',
    behance: '',
    medium: 'cheygalkaduwa',
    dev: '',
    stackoverflow: '', // example: '1/jeff-atwood'
    skype: '',
    telegram: '',
    website: '',
    phone: '',
    email: 'chethiya.galkaduwa@gmail.com',
  },
  // resume: {
  //   fileUrl:
  //     'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Empty fileUrl will hide the `Download Resume` button.
  // },
  skills: [
    'Python',
    'Django',
    'JavaScript',
    'React.js',
    'Node.js',
    'Git',
    'CSS',
    'Robo3T',
    'Tensorflow',
    'Pytorch',
    'OpenCV',
    'Jupyter Notebooks',
    'VScode',
    'Google Collab',
    'Sequential Modeling'
  ],
  research: [
    'Natural Language Processing',
    'Machine Learning',
    'Computer Vision',
  ],
  experiences: [
    
    {
      company: 'SLIIT(Sri Lankan Institution of Information and Technology), Sri Lanka',
      position: 'Asistant Lecturer',
      from: 'September 2024',
      to: 'December 2024',
      companyLink: 'https://www.sliit.lk',
    },
    {
      company: 'Cove Island, Sri Lanka',
      position: 'Python Developer',
      from: 'July 2024',
      to: 'September 2024',
      companyLink: 'https://coveisland.lk',
    },
    {
      company: 'iVedha, Canada',
      position: 'Software Engineer',
      from: 'January 2024',
      to: 'July 2024',
      companyLink: 'https://ivedha.com',
    },
    {
      company: 'Kihara Lab @ Purdue University, USA',
      position: 'Research Scholar',
      from: 'October 2022',
      to: 'February 2023',
      companyLink: 'https://kiharalab.org',
    },
  ],
  // certifications: [
  //   {
  //     name: 'Lorem ipsum',
  //     body: 'Lorem ipsum dolor sit amet',
  //     year: 'March 2022',
  //     link: 'https://example.com',
  //   },
  // ],
  educations: [
    {
      institution: 'University of Kelaniya',
      degree: 'B.Sc.(Honours) in Computer Science',
      from: '2018',
      to: '2023',
    },
    {
      institution: 'Trinity College Kandy',
      degree: 'Primary/Secondary Education',
      from: '2002',
      to: '2016',
    },
  ],
  publications: [
    {
      title: 'Prediction of 8-State Protein Secondary Structure Using Deep Neural Network Approach',
      conferenceName: 'International Conference on Advances in Computing and Technology and Student Symposium 2023',
      journalName: 'Abstract',
      authors: 'Chethiya Galkaduwa, Hansi Yashodhara',
      link: 'https://www.techrxiv.org/users/711672/articles/696138-leveraging-key-value-nosql-databases-for-enhanced-decision-support-systems-a-comparative-analysis',
      description:
        '',
    },
    {
      title: 'Data Science and Its Importance',
      conferenceName: 'Full-Paper',
      journalName: 'Biomedical Science and Clinical Research',
      authors: 'Chethiya Galkaduwa, Nethmini Ranasinghe',
      link: 'https://www.opastpublishers.com/open-access-articles/data-science-and-its-importance.pdf',
      description:
        '',
    },
    {
      title: 'Leveraging Key-Value NoSQL Databases for Enhanced Decision Support Systems: A Comparative Analysis',
      conferenceName: 'Pre-Print',
      journalName: '',
      authors: 'Chethiya Galkaduwa, Praveen Bhawantha',
      link: 'https://www.techrxiv.org/users/711672/articles/696138-leveraging-key-value-nosql-databases-for-enhanced-decision-support-systems-a-comparative-analysis',
      description:
        '',
    },
    {
      title: 'Challenges and Opportunities in Information Sharing during Cybersecurity Exercises',
      conferenceName: 'Pre-Print',
      journalName: '',
      authors: 'Chethiya Galkaduwa',
      link: 'https://www.researchgate.net/publication/377103303_Challenges_and_Opportunities_in_Information_Sharing_during_Cybersecurity_Exercises',
      description:
        '',
    },
  ],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'medium', // medium | dev
    username: 'cheygalkaduwa', // to hide blog section, keep it empty
    limit: 2, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'lofi',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      // 'dark',
      // 'cupcake',
      // 'bumblebee',
      // 'emerald',
      // 'corporate',
      // 'synthwave',
      // 'retro',
      // 'cyberpunk',
      // 'valentine',
      'halloween',
      // 'garden',
      // 'forest',
      // 'aqua',
      // 'lofi',
      // 'pastel',
      // 'fantasy',
      // 'wireframe',
      // 'black',
      // 'luxury',
      // 'dracula',
      // 'cmyk',
      // 'autumn',
      // 'business',
      // 'acid',
      // 'lemonade',
      'night',
      // 'coffee',
      // 'winter',
      // 'dim',
      // 'nord',
      // 'sunset',
      // 'procyon',
    ],

    // Custom theme, applied to `procyon` theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },


  enablePWA: true,
};

export default CONFIG;
