class TranslationService {
  constructor() {
    this.dictionary = {
      en: {
        navAbout: 'About us',
        navServices: 'Capabilities',
        navLocations: 'Locations',
        navContact: 'Contact',
        heroTag: 'INDUSTRIAL ELECTRONICS • SINCE 2021',
        heroTitle: 'Custom industrial control units',
        heroText: 'We design and manufacture electronic control units tailored to the individual requirements of our customers.',
        heroButton: 'Discuss your project →',
        heroMore: 'Our capabilities',
        heroCaption: 'From prototype to finished product',
        s1: 'Established',
        s2: 'Employees',
        s3: 'Engineering centers and assembly facilities',
        s4: 'Units per year (capacity)',
        aboutTitle: 'Ukrainian engineering and manufacturing company',
        aboutText: 'KYIVSPETSBLOK JSC specializes in designing and manufacturing control units for industrial equipment. We cover the entire product lifecycle, from technical requirements to series production and technical support.',
        aboutText2: 'Our mission is to develop specialized industrial electronics and expand our engineering and manufacturing network in Ukraine and Europe.',
        servicesTitle: 'From concept to production',
        c1: 'Electronics engineering',
        d1: 'Architecture, circuit design, printed circuit boards and enclosures.',
        c2: 'Embedded software',
        d2: 'Control algorithms, diagnostics and industrial interfaces.',
        c3: 'Prototyping & testing',
        d3: 'Prototype assembly, functional and environmental testing.',
        c4: 'Manufacturing',
        d4: 'PCB and enclosure manufacturing, SMT/THT assembly, small-batch and series production.',
        c5: 'Modernization',
        d5: 'Adaptation and replacement of obsolete control units.',
        c6: 'Technical support',
        d6: 'Documentation, diagnostics and product updates.',
        industriesTag: 'Industries',
        industriesTitle: 'Solutions for your equipment',
        i1: 'Industrial equipment',
        i1d: 'Our main focus: machine tools, production lines and process equipment.',
        i2: 'Special machinery',
        i2d: 'Construction, municipal and mining equipment.',
        i3: 'Heavy-duty vehicles',
        i3d: 'Trucks, mining dump trucks and specialized vehicles.',
        i4: 'Agricultural machinery',
        i4d: 'Tractors, harvesters and implements.',
        locationsTitle: 'Engineering and manufacturing network',
        active: 'Operational',
        building: 'Under construction',
        prep: 'In preparation',
        planned: 'Planning',
        l1: 'Kyiv, Ukraine',
        l1d: 'Head office',
        l2: 'Brovary, Ukraine',
        l2d: 'Engineering Bureau No. 1, Assembly Plant No. 1',
        l3: 'Rivne, Ukraine',
        l3d: 'Office No. 2, Small Engineering Bureau No. 2, Assembly Plant No. 2',
        l4: 'Lutsk, Ukraine',
        l4d: 'Production Plant No. 3',
        l5: 'Brno, Czechia',
        l5d: 'European office, engineering bureau and production-assembly complex',
        l6: 'Šiauliai, Lithuania',
        l6d: 'Office, small engineering bureau and assembly plant',
        contactTitle: 'Let’s engineer your next control unit.',
        contactText: 'Tell us about your equipment, requirements and operating conditions.',
        office: 'Head office',
        address: '21 Khreshchatyk Street, Kyiv, Ukraine',
        demoContacts: 'Illustrative contact details for an academic project.',
        motto: 'We design. We manufacture. We control.',
        disclaimer: 'Academic company concept. Figures and illustrations are for demonstration.'
      }
    };

    this.translatableNodes = Array.from(document.querySelectorAll('[data-t]'));
    this.defaultLanguageMap = this.captureDefaultLanguageMap();
  }

  captureDefaultLanguageMap() {
    const entries = this.translatableNodes.map((node) => [node.dataset.t, node.textContent.trim()]);
    return Object.fromEntries(entries);
  }

  getLanguageData(language) {
    return language === 'en' ? this.dictionary.en : this.defaultLanguageMap;
  }

  setLanguage(language) {
    const selectedLanguage = ['uk', 'en'].includes(language) ? language : 'uk';
    const languageData = this.getLanguageData(selectedLanguage);

    this.translatableNodes.forEach((node) => {
      const key = node.dataset.t;
      node.textContent = languageData[key] ?? this.defaultLanguageMap[key] ?? '';
    });

    document.documentElement.lang = selectedLanguage;
    this.updateLanguageButtons(selectedLanguage);
    this.saveLanguage(selectedLanguage);
  }

  updateLanguageButtons(activeLanguage) {
    document.querySelectorAll('[data-lang]').forEach((button) => {
      const isActive = button.dataset.lang === activeLanguage;
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  saveLanguage(language) {
    try {
      localStorage.setItem('ksb-language', language);
    } catch (error) {
      console.warn('Language preference could not be saved.', error);
    }
  }

  loadSavedLanguage() {
    try {
      return localStorage.getItem('ksb-language') || 'uk';
    } catch (error) {
      return 'uk';
    }
  }
}

class NavigationMenu {
  constructor(toggleButton, navigation) {
    this.toggleButton = toggleButton;
    this.navigation = navigation;
    this.navigationLinks = Array.from(this.navigation.querySelectorAll('a'));
  }

  init() {
    this.toggleButton.addEventListener('click', () => this.toggle());
    this.navigationLinks.forEach((link) => {
      link.addEventListener('click', () => this.close());
    });
  }

  toggle() {
    const isOpen = this.navigation.classList.toggle('open');
    this.toggleButton.setAttribute('aria-expanded', String(isOpen));
  }

  close() {
    this.navigation.classList.remove('open');
    this.toggleButton.setAttribute('aria-expanded', 'false');
  }
}

class WebsiteApp {
  constructor() {
    this.translationService = new TranslationService();
    this.navigationMenu = new NavigationMenu(
      document.querySelector('.menu-toggle'),
      document.querySelector('.site-nav')
    );
  }

  bindLanguageEvents() {
    document.querySelectorAll('[data-lang]').forEach((button) => {
      button.addEventListener('click', () => {
        this.translationService.setLanguage(button.dataset.lang);
      });
    });
  }

  init() {
    this.bindLanguageEvents();
    this.navigationMenu.init();
    this.translationService.setLanguage(this.translationService.loadSavedLanguage());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new WebsiteApp();
  app.init();
});
