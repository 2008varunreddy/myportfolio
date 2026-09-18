(() => {
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const englishCopy = {
    previousScreenshot: "Previous project screenshot",
    nextScreenshot: "Next project screenshot",
    viewFullImage: "View screenshot full size",
    closeViewer: "Close image viewer",
    imageViewer: "Project screenshot viewer",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    emailCopied: "Email copied",
    readLess: "Read less",
    readMore: "Read more",
    mailSubject: name => `Portfolio message from ${name}`,
    mailFrom: "From",
    mailEmail: "Email"
  };

  const koreanCopy = {
    previousScreenshot: "이전 프로젝트 스크린샷",
    nextScreenshot: "다음 프로젝트 스크린샷",
    viewFullImage: "스크린샷 크게 보기",
    closeViewer: "이미지 뷰어 닫기",
    imageViewer: "프로젝트 스크린샷 뷰어",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    emailCopied: "이메일 주소가 복사되었습니다",
    readLess: "접기",
    readMore: "더 보기",
    mailSubject: name => `포트폴리오를 통한 문의: ${name}`,
    mailFrom: "보낸 사람",
    mailEmail: "이메일"
  };

  const englishContent = new Map();
  const englishAttributes = new Map();
  const rememberAttribute = (element, name) => {
    if (!englishAttributes.has(element)) englishAttributes.set(element, new Map());
    const attributes = englishAttributes.get(element);
    if (!attributes.has(name)) attributes.set(name, element.getAttribute(name));
  };
  const rememberContent = element => {
    if (!englishContent.has(element)) englishContent.set(element, [...element.childNodes]);
    rememberAttribute(element, "aria-label");
  };

  const setHtml = (selector, value) => qsa(selector).forEach(element => {
    rememberContent(element);
    element.innerHTML = value;
  });
  const setText = (selector, value) => qsa(selector).forEach(element => {
    rememberContent(element);
    element.textContent = value;
  });
  const setList = (selector, values) => qsa(selector).forEach((element, index) => {
    if (values[index] === undefined) return;
    rememberContent(element);
    element.textContent = values[index];
  });
  const setOwnTextList = (selector, values) => qsa(selector).forEach((element, index) => {
    if (values[index] === undefined) return;
    rememberContent(element);
    [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => node.remove());
    element.append(document.createTextNode(` ${values[index]}`));
  });
  const setAttribute = (selector, name, value) => qsa(selector).forEach(element => {
    rememberAttribute(element, name);
    element.setAttribute(name, value);
  });

  function restoreEnglish() {
    englishContent.forEach((nodes, element) => {
      if (element.isConnected) element.replaceChildren(...nodes);
    });
    englishAttributes.forEach((attributes, element) => {
      if (!element.isConnected) return;
      attributes.forEach((value, name) => {
        if (value === null) element.removeAttribute(name);
        else element.setAttribute(name, value);
      });
    });
    document.title = "Nandi Varun Reddy | Computer Science & Cybersecurity Portfolio";
    const englishDescription = "Computer science and cybersecurity student Nandi Varun Reddy presents practical Python projects in network security, packet analysis, and log analysis.";
    setAttribute('meta[name="description"]', "content", englishDescription);
    setAttribute('meta[property="og:title"]', "content", "Nandi Varun Reddy | Computer Science & Cybersecurity Portfolio");
    setAttribute('meta[property="og:description"]', "content", "A bilingual portfolio of practical Python projects in network security, packet analysis, and log analysis.");
  }

  const gateCursor = qs(".cursor");
  const trackGateCursor = event => {
    if (!gateCursor) return;
    gateCursor.style.left = `${event.clientX}px`;
    gateCursor.style.top = `${event.clientY}px`;
  };
  if (gateCursor && matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", trackGateCursor, { passive:true });
  }

  function applyKorean() {
    const nav = ["홈", "소개", "프로젝트", "아트", "목표", "연락처"];
    document.documentElement.lang = "ko";
    document.title = "난디 바룬 레디 | 컴퓨터과학 및 사이버보안 포트폴리오";
    const koreanDescription = "인도 텔랑가나 출신으로 컴퓨터과학과 사이버보안을 공부하는 학생 난디 바룬 레디의 이중 언어 포트폴리오입니다. Python으로 만든 네트워크 보안, 패킷 분석, 로그 분석 프로젝트를 소개합니다.";
    setAttribute('meta[name="description"]', "content", koreanDescription);
    setAttribute('meta[property="og:title"]', "content", "난디 바룬 레디 | 컴퓨터과학 및 사이버보안 포트폴리오");
    setAttribute('meta[property="og:description"]', "content", koreanDescription);
    setAttribute('meta[property="og:image:alt"]', "content", "난디 바룬 레디의 인물 사진");
    setHtml(".language-mark,.brand-chip", "바룬<sup>®</sup>");
    setText(".hero-word,.loader-word", "바룬");
    setHtml(".footer-word", "바룬<sup>®</sup>");
    setText(".cursor span", "보기");
    setText(".mobile-header .call-chip", "문의하기");
    setAttribute(".menu-button", "aria-label", "메뉴 열기");
    setAttribute(".sidebar", "aria-label", "포트폴리오 내비게이션");
    setAttribute(".socials a:first-child", "aria-label", "바룬의 GitHub");
    setAttribute(".socials a:last-child", "aria-label", "바룬에게 이메일 보내기");
    setHtml(".side-intro > p", "<strong class=\"inline-full-name\">난디 바룬 레디</strong>는 컴퓨터과학과 사이버보안을 공부하는 학생입니다. 네트워크, Linux, 보안 윤리, 위협 탐지를 배우며 실용적인 Python 도구를 만들고 있습니다.");
    setHtml(".side-projects-target span", "<b>보안</b> 프로젝트");
    setHtml(".side-years-target span", "취득한<br />수료증");
    setList(".side-label", nav);
    setList(".hero-nav a", nav);
    setOwnTextList(".mobile-menu nav a", nav);
    setList(".skill-marquee span", ["Python", "Linux", "보안", "아트", "Python", "Linux", "보안", "아트"]);
    setAttribute(".client-strip", "aria-label", "기술: Python, Linux, 보안, 아트");
    setText(".book-button", "문의하기");

    setHtml(".hero-kicker", "보안 도구를 만드는<br />바룬입니다.<small><strong class=\"hero-full-name\">난디 바룬 레디</strong><span>컴퓨터과학과 사이버보안을 공부하는 학생</span></small>");
    setAttribute(".hero-photo", "alt", "난디 바룬 레디의 인물 사진");
    setHtml(".hero-title h1", "<span>보안을</span><span>실용적으로</span><span>구현하다.</span>");
    setText(".hero-actions a:first-child", "문의하기");
    setText(".hero-actions a:last-child", "소개 보기");
    setHtml(".projects-stat span", "<b>보안</b> 프로젝트");
    setHtml(".years-stat span", "취득한<br />수료증");
    setOwnTextList(".traits-card > span", ["창의성", "신뢰성", "전략적 사고", "실행력", "효율성"]);
    setText(".hero-copy", "네트워크, Linux, 보안 윤리, 위협 탐지를 배우며 실용적인 Python 도구를 만드는 학생입니다. 컴퓨터과학과 사이버보안을 공부하고 있습니다.");
    setText(".scroll-note span", "스크롤하여 둘러보기");

    setText(".about .eyebrow", "학습 · 개발 · 보안");
    setHtml(".about .section-heading h2", "자기소개와<br />성장 과정");
    setHtml(".about .section-heading > p", "저는 인도 텔랑가나 출신으로, 컴퓨터과학과 사이버보안에 관심을 가지고 공부하는 <strong class=\"inline-full-name\">난디 바룬 레디</strong>입니다. Python 프로젝트를 통해 네트워크, 방어 중심의 보안, 자동화, 위협 탐지를 실제로 적용하며 이해를 넓히고 있습니다. 기술 공부 외에는 흑연 드로잉을 즐기며 인내심과 세밀한 관찰력을 길러 왔습니다.");
    setText(".timeline-card:nth-of-type(1) .year", "10학년");
    setText(".timeline-card:nth-of-type(1) h3", "10학년");
    setText(".timeline-card:nth-of-type(1) > p", "탄탄한 학업 기초를 쌓고, 스스로 꾸준히 공부하는 습관을 길렀습니다.");
    setText(".timeline-card:nth-of-type(1) .academic-score small", "평점");
    setHtml(".timeline-card:nth-of-type(1) .card-meta > span", "평균 평점<br /><em>학업 성적</em>");
    setText(".timeline-card:nth-of-type(2) .year", "11학년");
    setText(".timeline-card:nth-of-type(2) h3", "11학년");
    setText(".timeline-card:nth-of-type(2) > p", "모든 과목에서 집중력과 꾸준함을 유지하며 공부했습니다.");
    setHtml(".timeline-card:nth-of-type(2) .card-meta > span", "461 / 470점<br /><em>학업 성적</em>");
    setText(".timeline-card:nth-of-type(3) .year", "12학년");
    setText(".timeline-card:nth-of-type(3) h3", "12학년");
    setText(".timeline-card:nth-of-type(3) > p", "인내와 꾸준함, 세부 사항에 대한 집중력을 보여 주는 성적으로 학교 과정을 마쳤습니다.");
    setHtml(".timeline-card:nth-of-type(3) .card-meta > span", "979 / 1000점<br /><em>학업 성적</em>");
    setText(".timeline-card:nth-of-type(4) > p", "하버드대학교 CS50에서 제공하는 Python 프로그래밍 입문 과정입니다.");
    setHtml(".timeline-card:nth-of-type(4) .card-meta > span", "Python 프로그래밍<br /><em>수료한 과정</em>");
    setText(".timeline-card:nth-of-type(5) h3", "Pre Security 보안 기초 과정");
    setText(".timeline-card:nth-of-type(5) > p", "컴퓨터, 네트워크, 웹, 보안의 기초를 다루는 TryHackMe Pre Security 학습 과정입니다.");
    setHtml(".timeline-card:nth-of-type(5) .card-meta > span", "TryHackMe Pre Security<br /><em>수료한 과정</em>");
    setText(".timeline-card:nth-of-type(6) h3", "IELTS 아카데믹");
    setText(".timeline-card:nth-of-type(6) > p", "학업 목적의 듣기, 읽기, 쓰기, 말하기 전 영역에서 높은 영어 능력을 입증한 종합 밴드 점수입니다.");
    setHtml(".timeline-card:nth-of-type(6) .card-meta > span", "듣기 7.5 · 읽기 7.5 · 쓰기 8.0 · 말하기 6.5<br /><em>종합 밴드 점수 · CEFR C1</em>");
    setText(".certificate-link", "수료증 보기 ↗");

    setText(".technical-foundation .eyebrow", "현재 보유한 기술");
    setText(".technical-foundation h3", "기초 기술 역량");
    setList(".foundation-group dt", ["프로그래밍", "사이버보안", "네트워크", "도구 / 기술", "시스템"]);
    setList(".foundation-group dd", [
      "Python",
      "네트워크 보안, 로그 분석, 기초 위협 탐지, 보안 윤리와 책임 있는 보안 실습의 기본 개념",
      "TCP/IP 기초, 포트 및 서비스, 패킷 분석, DNS, ICMP",
      "Git, GitHub, Scapy, Streamlit",
      "Linux 기초, 명령줄"
    ]);

    setText(".work-intro .eyebrow", "주요 프로젝트");
    setHtml(".work-intro h2", "위협을 탐지하고,<br />결과를 이해하기 쉽게");
    setText(".work-intro > p", "제가 학습하는 방식을 보여 주는 세 가지 프로젝트입니다. 도구를 만들고, 허가된 환경에서 테스트하고, 결과를 문서화해 누구나 쉽게 살펴볼 수 있게 했습니다.");
    setAttribute(".project-card:nth-child(1) .project-gallery", "aria-label", "네트워크 보안 모니터 스크린샷");
    setAttribute(".project-card:nth-child(2) .project-gallery", "aria-label", "포트 취약점 스캐너 스크린샷");
    setAttribute(".project-card:nth-child(3) .project-gallery", "aria-label", "로그 분석기 스크린샷");
    setList(".project-card:nth-child(1) .project-tags span", ["01", "Python", "Scapy", "Streamlit", "네트워크", "규칙 기반 탐지"]);
    setList(".project-card:nth-child(2) .project-tags span", ["02", "Python", "네트워크", "위험"]);
    setList(".project-card:nth-child(3) .project-tags span", ["03", "Python", "로그", "방어"]);
    setText(".project-card:nth-child(1) .project-info h3", "네트워크 보안 모니터");
    setText(".project-card:nth-child(1) .project-summary", "실시간 네트워크 트래픽을 수집하고 패킷의 통신 패턴을 분석하는 Python 기반 보안 모니터입니다. 규칙 기반으로 의심스러운 활동을 탐지하고 보안 경보를 기록하며, Streamlit 대시보드에서 네트워크 활동을 실시간으로 시각화합니다.");
    setText(".project-card:nth-child(1) .project-proof", "패킷 분석, 네트워크 프로토콜 분석, 행위 기반 탐지 규칙, 보고서 및 경보 기록의 저장·보존, 시각화, 탐지 규칙 자동 테스트를 구현했습니다.");
    setText(".project-card:nth-child(2) .project-info h3", "포트 취약점 스캐너");
    setText(".project-card:nth-child(2) .project-summary", "스캔이 허가된 대상의 지정된 포트를 검사하고, 외부에 노출된 서비스를 식별하는 Python 네트워크 도구입니다. 기본적인 보안 위험을 평가하고 대응 권고 사항을 담은 보고서를 생성합니다.");
    setText(".project-card:nth-child(2) .project-proof", "Python 소켓 프로그래밍, 서비스 식별, 모듈형 프로그램 설계, 위험도 분류, 보고서 생성을 구현했습니다.");
    setText(".project-card:nth-child(3) .project-info h3", "로그 분석기");
    setText(".project-card:nth-child(3) .project-summary", "Apache 형식의 접근 로그를 파싱하여 로그인 시도 실패, 관리자 경로 접근, 반복되는 404 오류 등 요청 내역과 의심스러운 행위 패턴을 분석하는 Python 로그 분석 도구입니다.");
    setText(".project-card:nth-child(3) .project-proof", "정규 표현식, 로그 파싱, 규칙 기반 분석, IP별 활동 추적, 위험도 분류, 보고서 생성을 구현했습니다.");
    setText(".project-card .project-actions a:first-child", "데모 ↗");
    setAttribute('.project-card:nth-child(1) img:nth-child(1)', 'alt', '실시간 네트워크 패킷 수와 프로토콜 분포를 보여 주는 Streamlit 대시보드');
    setAttribute('.project-card:nth-child(1) img:nth-child(2)', 'alt', '프로토콜 분포, 현재 경보, 경보 기록을 보여 주는 네트워크 모니터 대시보드');
    setAttribute('.project-card:nth-child(1) img:nth-child(3)', 'alt', '네트워크 보안 모니터의 자동 탐지 테스트가 통과했음을 보여 주는 터미널 화면');
    setAttribute('.project-card:nth-child(2) img:nth-child(1)', 'alt', '모듈형 포트 취약점 스캐너의 Python 소스 코드');
    setAttribute('.project-card:nth-child(2) img:nth-child(2)', 'alt', '스캔이 허가된 대상을 입력하는 터미널 화면');
    setAttribute('.project-card:nth-child(2) img:nth-child(3)', 'alt', '열린 포트에서 실행 중인 서비스, 위험도 분류, 대응 권고 사항을 보여 주는 터미널 보고서');
    setAttribute('.project-card:nth-child(2) img:nth-child(4)', 'alt', '텍스트 파일로 저장된 포트 취약점 스캐너 보고서');
    setAttribute('.project-card:nth-child(3) img:nth-child(1)', 'alt', '로그 분석기 및 위협 탐지기 Python 소스 코드');
    setAttribute('.project-card:nth-child(3) img:nth-child(2)', 'alt', 'Apache 형식의 로그 파일을 분석하는 터미널 화면');
    setAttribute('.project-card:nth-child(3) img:nth-child(3)', 'alt', '요청 내역, 로그인 시도 실패, 404 오류, 관리자 경로 접근을 요약한 터미널 보고서');
    setAttribute('.project-card:nth-child(3) img:nth-child(4)', 'alt', 'IP 주소별 요청 수를 보여 주는 저장된 로그 분석 보고서');

    setText(".services .eyebrow", "직접 그린 작품");
    setText(".services .section-heading h2", "흑연 드로잉");
    setText(".services .section-heading > p", "그림을 그리며 보안 분야에서도 중요하게 여기는 인내심, 관찰력, 정확성, 그리고 다른 사람이 놓치기 쉬운 세부 사항을 살피는 능력을 기릅니다.");
    setAttribute('.art-card:nth-child(1) .art-image', 'alt', '피리와 화려한 장신구가 돋보이는 신화 속 두 인물을 그린 정교한 흑연 드로잉');
    setAttribute('.art-card:nth-child(2) .art-image', 'alt', '전통 장신구와 사리를 착용한 여성의 흑연 인물화');
    setAttribute('.art-card:nth-child(3) .art-image', 'alt', '표현력 있는 눈과 섬세한 얼굴 질감에 초점을 맞춘 흑연 클로즈업 인물화');

    setText(".testimonials .eyebrow", "목표");
    setHtml(".testimonials .section-heading h2", "앞으로의 목표와<br />그 이유");
    setAttribute(".testimonial-track", "aria-label", "목표 카드");
    setText(".goal-card:nth-child(1) h3", "사이버보안 실무자");
    setText(".goal-card:nth-child(1) > p", "컴퓨터과학을 공부하며 Linux와 네트워크 기초를 탄탄히 다지고, 실용적인 위협 탐지 및 방어 도구를 만들겠습니다. 이 과정에서 보안 업무에 필요한 판단력도 함께 기르겠습니다.");
    setText(".goal-card:nth-child(1) footer > span", "보안");
    setText(".goal-card:nth-child(1) footer strong", "보안 분야의 성장 방향");
    setText(".goal-card:nth-child(1) footer small", "탐지 및 방어");
    setText(".goal-card:nth-child(2) h3", "직접 만들며 배우기");
    setText(".goal-card:nth-child(2) > p", "방어 중심의 보안 프로젝트를 꾸준히 만들고, 입문용 실습 환경과 CTF에서 연습하며 배운 내용을 기록하겠습니다. 각 프로젝트를 통해 기술 역량을 더욱 탄탄히 쌓겠습니다.");
    setText(".goal-card:nth-child(2) footer > span", "개발");
    setText(".goal-card:nth-child(2) footer strong", "개발자로서의 성장 방향");
    setText(".goal-card:nth-child(2) footer small", "Python · 프로젝트 · 커뮤니티");
    setText(".drag-hint", "드래그 / 스크롤");

    setText(".contact .eyebrow", "연락하기");
    setHtml(".contact .section-heading h2", "함께 유용한 것을<br />만들어 봅시다.");
    setText(".contact .section-heading > p", "학습 기회, 협업, 프로젝트 피드백, 사이버보안이나 컴퓨터과학에 관한 대화를 언제든 환영합니다.");
    setText(".contact-card:nth-child(1) > span", "이메일");
    setText(".contact-card:nth-child(1) > b", "메일 보내기 ↗");
    setText(".contact-card:nth-child(2) > b", "코드 보기 ↗");
    setText(".contact-card:nth-child(3) > span", "위치");
    setText(".contact-card:nth-child(3) > strong", "인도 텔랑가나");
    setText(".contact-card:nth-child(3) > b", "온라인으로 연락 가능");
    setText('.contact-form label:nth-child(1) > span', '이름');
    setAttribute('.contact-form input[name="name"]', 'placeholder', '어떻게 불러 드릴까요?');
    setText('.contact-form label:nth-child(2) > span', '이메일');
    setText('.contact-form label:nth-child(3) > span', '메시지');
    setAttribute('.contact-form textarea', 'placeholder', '전하고 싶은 내용을 적어 주세요.');
    setText('.contact-form button', '이메일 작성하기 ↗');
    setText('.contact-form > small', '메시지가 작성된 상태로 이메일 앱이 열립니다.');
    setText('.toast', '이메일 주소가 복사되었습니다');
  }

  function applyLanguage(language) {
    const isKorean = language === "ko";
    document.documentElement.lang = isKorean ? "ko" : "en";
    document.body.classList.toggle("lang-ko", isKorean);
    document.body.classList.toggle("lang-en", !isKorean);
    window.portfolioLanguage = isKorean ? "ko" : "en";
    window.portfolioCopy = isKorean ? koreanCopy : englishCopy;
    if (isKorean) applyKorean();
    else restoreEnglish();
    window.refreshPortfolioTranslations?.();
    updateLanguageToggle();
  }

  function updateLanguageToggle() {
    const toggle = qs(".language-toggle");
    if (!toggle) return;
    const isKorean = window.portfolioLanguage === "ko";
    toggle.dataset.active = isKorean ? "ko" : "en";
    toggle.setAttribute("aria-label", isKorean ? "영어로 전환" : "Switch to Korean");
  }

  function getVisibleTextElements() {
    const selector = "main,aside,.mobile-header,.mobile-menu";
    const containers = qsa(selector);
    const all = containers.flatMap(container => [container, ...qsa("*", container)]);
    const candidates = all.filter(element => {
      if (element.closest(".language-toggle,.cursor,.image-viewer")) return false;
      if (element.matches("script,style,input,textarea,video,img,svg,path,br,sup,.nav-label-clone,.button-label-clone")) return false;
      if (![...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim())) return false;
      return true;
    }).map(element => {
      if (element.matches(".text-word")) return element.closest("[data-text-reveal-ready]") || element;
      if (element.matches(".hero-letter")) return element.closest(".hero-word") || element;
      if (element.matches(".nav-label-primary")) return element.closest("[data-nav-roll-ready]") || element;
      if (element.matches(".button-label-primary")) return element.closest("[data-button-roll-ready]") || element;
      if (element.matches(".roll-line")) return element.closest("[data-roll-ready]") || element;
      if (element.matches(".mega-roll-line")) return element.parentElement || element;
      return element;
    });

    const unique = [...new Set(candidates)];
    return unique.filter(element => !unique.some(parent => parent !== element && parent.contains(element))).filter(element => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const margin = 24;
      const intersectsViewport = rect.bottom > -margin && rect.top < innerHeight + margin && rect.right > -margin && rect.left < innerWidth + margin;
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > .02 && rect.width > 0 && rect.height > 0 && intersectsViewport;
    });
  }

  function getLanguageReelElements() {
    return getVisibleTextElements();
  }

  const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

  function animateLanguageReel(elements, direction) {
    const ordered = [...elements].sort((first, second) => {
      const firstRect = first.getBoundingClientRect();
      const secondRect = second.getBoundingClientRect();
      return firstRect.top - secondRect.top || firstRect.left - secondRect.left;
    });
    const outgoing = direction === "out";
    const duration = outgoing ? 260 : 440;
    const delayRange = outgoing ? 18 : 30;
    const easing = outgoing ? "cubic-bezier(.55,.06,.45,.94)" : "cubic-bezier(.16,1,.3,1)";
    const activeAnimations = [];
    const animations = ordered.map((element, index) => {
      const current = getComputedStyle(element);
      const restOpacity = current.opacity;
      const frames = outgoing
        ? [
            { translate:"0 0", opacity:restOpacity },
            { translate:"0 -.45em", opacity:0, offset:.72 },
            { translate:"0 -.7em", opacity:0 }
          ]
        : [
            { translate:"0 .55em", opacity:.32 },
            { translate:"0 .12em", opacity:restOpacity, offset:.5 },
            { translate:"0 -.04em", opacity:restOpacity, offset:.84 },
            { translate:"0 0", opacity:restOpacity }
          ];
      const animation = element.animate(frames, {
        duration,
        delay:(index / Math.max(1, ordered.length - 1)) * delayRange,
        easing,
        fill:"both"
      });
      activeAnimations.push(animation);
      return animation.finished.catch(() => undefined);
    });
    return Promise.all(animations).then(() => activeAnimations);
  }

  async function switchLanguage(language) {
    if (document.body.classList.contains("language-switching") || language === window.portfolioLanguage) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    qsa(".language-spin-item").forEach(element => element.classList.remove("language-spin-item"));
    const oldElements = getLanguageReelElements();
    const scrollYBefore = window.scrollY;
    document.body.classList.add("language-switching");

    if (!reduced) {
      const outgoingAnimations = await animateLanguageReel(oldElements, "out");

      applyLanguage(language);
      window.scrollTo(0, scrollYBefore);
      outgoingAnimations.forEach(animation => animation.cancel());
      const newElements = getLanguageReelElements();
      const incomingAnimations = await animateLanguageReel(newElements, "in");
      incomingAnimations.forEach(animation => animation.cancel());

      qsa(".language-spin-item").forEach(element => element.classList.remove("language-spin-item"));
      document.body.classList.remove("language-switching");
      window.dispatchEvent(new CustomEvent("portfolio:languagechange", { detail:{ language } }));
      window.ScrollTrigger?.refresh();
      return;
    }

    applyLanguage(language);
    window.scrollTo(0, scrollYBefore);
    const newElements = getVisibleTextElements();

    await wait(40);

    qsa(".language-spin-item").forEach(element => element.classList.remove("language-spin-item"));
    document.body.classList.remove("language-switching");
    window.dispatchEvent(new CustomEvent("portfolio:languagechange", { detail:{ language } }));
    window.ScrollTrigger?.refresh();
  }

  function loadPortfolio() {
    const script = document.createElement("script");
    script.src = "app.js?v=20260913-glass-handoff";
    script.onload = () => {
      window.removeEventListener("pointermove", trackGateCursor);
      document.body.classList.remove("language-pending");
      qs(".language-gate")?.remove();
      updateLanguageToggle();
    };
    script.onerror = () => {
      document.body.classList.remove("language-pending", "is-loading");
      qs(".language-gate")?.remove();
    };
    document.body.append(script);
  }

  let choosing = false;
  qsa("[data-language]").forEach(button => button.addEventListener("click", () => {
    if (choosing) return;
    choosing = true;
    applyLanguage(button.dataset.language);
    qs(".language-gate")?.classList.add("is-leaving");
    setTimeout(loadPortfolio, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 420);
  }));

  qs(".language-toggle")?.addEventListener("click", () => {
    const nextLanguage = window.portfolioLanguage === "ko" ? "en" : "ko";
    switchLanguage(nextLanguage);
  });

  requestAnimationFrame(() => qs('[data-language="en"]')?.focus());
})();
