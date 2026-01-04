import { Component, OnInit, AfterViewInit } from '@angular/core';

interface BotResponses {
  [key: string]: string[];
}

interface KeywordMap {
  [key: string]: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'Portfolio_Web';

  // =======================
  // Chatbot data
  // =======================

  botResponses: BotResponses = {
    greeting: [
      'Hey there! How can I help you today?',
      'Hello! Feel free to ask me anything about my work.',
      'Hi! What would you like to know?'
    ],
    skills: [
      "I'm proficient in React, Angular, Node.js, TypeScript, MongoDB, and many other modern technologies.",
      'My main skills include full-stack development, UI/UX design, API development, and mobile app development.'
    ],
    services: [
      'I offer services like Web Development, Mobile App Development, UI/UX Design, API Development, Consulting, and Testing & QA.',
      'Check out the Services section on my portfolio to see all the services I provide!'
    ],
    experience: [
      'I have 5+ years of experience in web development, having worked at several top tech companies.',
      "I've built projects ranging from e-commerce platforms to real-time analytics dashboards."
    ],
    projects: [
      'I\'ve worked on exciting projects including an E-Commerce Platform, Social Media Dashboard, and Task Management App.',
      'Feel free to check out my Portfolio section to see all my projects with detailed information!'
    ],
    contact: [
      'You can reach me via email at hello@example.com or call +1 (234) 567-8900.',
      "Feel free to fill out the contact form in the Contact section, and I'll get back to you soon!"
    ],
    default: [
      "That's interesting! Tell me more about what you're looking for.",
      "I'd be happy to help! Could you provide more details?",
      "Sorry, I didn't quite understand. Could you rephrase that?",
      'Feel free to ask me about my skills, services, projects, or experience!'
    ]
  };

  keywords: KeywordMap = {
    skills: ['skill', 'expertise', 'technology', 'tech', 'proficient', 'know', 'languages'],
    services: ['service', 'offer', 'help', 'do you', 'what can', 'provide'],
    experience: ['experience', 'work', 'background', 'history', 'worked', 'past', 'years'],
    projects: ['project', 'portfolio', 'work', 'built', 'created', 'showcase'],
    contact: ['contact', 'reach', 'phone', 'email', 'call', 'connect'],
    greeting: ['hi', 'hello', 'hey', 'how are', "what's up", 'sup']
  };

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initChatbot();
    this.initExperienceSlider();
    this.initTypingAnimation();
  }

  // =======================
  // Chatbot logic
  // =======================

  getBotResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();

    for (const category in this.keywords) {
      if (this.keywords[category].some(word => message.includes(word))) {
        const responses = this.botResponses[category];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    const defaults = this.botResponses['default'];
    return defaults[Math.floor(Math.random() * defaults.length)];
  }

  escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  initChatbot(): void {
    const toggle = document.getElementById('chatbotToggle');
    const container = document.getElementById('chatbotContainer');
    const closeBtn = document.getElementById('chatbotCloseBtn');
    const form = document.getElementById('chatbotForm') as HTMLFormElement;
    const input = document.getElementById('chatbotInput') as HTMLInputElement;
    const messages = document.getElementById('chatbotMessages');
    const badge = document.querySelector('.chatbot-badge') as HTMLElement;

    if (!toggle || !container || !closeBtn || !form || !input || !messages) return;

    toggle.addEventListener('click', () => {
      container.classList.toggle('active');
      toggle.classList.toggle('hidden');
      if (badge) badge.style.display = 'none';
      setTimeout(() => input.focus(), 300);
    });

    closeBtn.addEventListener('click', () => {
      container.classList.remove('active');
      toggle.classList.remove('hidden');
      if (badge) badge.style.display = 'flex';
    });

    form.addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault();
      const userMessage = input.value.trim();
      if (!userMessage) return;

      messages.innerHTML += `
        <div class="message user-message">
          <div class="message-content">
            <p>${this.escapeHtml(userMessage)}</p>
          </div>
        </div>
      `;

      input.value = '';
      messages.scrollTop = messages.scrollHeight;

      setTimeout(() => {
        const reply = this.getBotResponse(userMessage);
        messages.innerHTML += `
          <div class="message bot-message">
            <div class="message-content">
              <p>${this.escapeHtml(reply)}</p>
            </div>
          </div>
        `;
        messages.scrollTop = messages.scrollHeight;
      }, 500);
    });
  }

  // =======================
  // Experience slider
  // =======================

  initExperienceSlider(): void {
    const track = document.getElementById('experienceTrack');
    const prev = document.querySelector('.slider-btn.prev') as HTMLButtonElement;
    const next = document.querySelector('.slider-btn.next') as HTMLButtonElement;
    if (!track || !prev || !next) return;

    const total = track.children.length;
    let index = 0;
    let visible = this.computeVisible();

    const update = () => {
      track.style.transform = `translateX(-${(index * 100) / visible}%)`;
      prev.disabled = index === 0;
      next.disabled = index >= total - visible;
    };

    prev.addEventListener('click', () => {
      if (index > 0) {
        index--;
        update();
      }
    });

    next.addEventListener('click', () => {
      if (index < total - visible) {
        index++;
        update();
      }
    });

    window.addEventListener('resize', () => {
      visible = this.computeVisible();
      index = Math.min(index, total - visible);
      update();
    });

    update();
  }

  computeVisible(): number {
    if (window.innerWidth < 576) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  }

  // =======================
  // Typing animation
  // =======================

  initTypingAnimation(): void {
    const roles = ['Full Stack Developer', 'UI/UX Designer', 'Tech Enthusiast'];
    const el = document.getElementById('typedRole');
    if (!el) return;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const current = roles[roleIndex];

      if (!deleting) {
        el.textContent = current.slice(0, ++charIndex);
      } else {
        el.textContent = current.slice(0, charIndex--);
      }

      if (!deleting && charIndex === current.length) {
        setTimeout(() => (deleting = true), 900);
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }

      setTimeout(tick, deleting ? 80 : 120);
    };

    setTimeout(tick, 500);
  }
}
