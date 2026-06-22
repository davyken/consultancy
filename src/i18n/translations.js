const t = {
  en: {
    // Navbar
    nav: {
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      more: 'More',
      team: '👥 Team',
      projects: '📁 Projects',
      partners: '🤝 Partners',
      testimonials: '⭐ Testimonials',
      services: '🗂️ Our Services',
      itServices: 'IT Services',
      realEstate: 'Real Estate',
    },

    // Home
    home: {
      sectorTag: 'Our Sectors',
      sectorTitle: 'Choose Your Sector',
      sectorSubtitle: 'Great Rift Consultancy operates in two key sectors. Click the domain that interests you.',

      itTag: 'IT Services',
      itTitle: 'Digital Solutions & Development',
      itDesc: 'Websites, mobile apps, SEO, professional email, hosting — everything your business needs to succeed online.',
      itCta: 'Explore IT Services',
      itServices: ['Websites', 'Web Apps', 'Mobile Apps', 'SEO', 'Pro Email', 'Hosting'],

      reTag: 'Real Estate',
      reTitle: 'Land & Properties in Cameroon',
      reDesc: 'Buy or invest in residential, commercial and agricultural land in Yaoundé, Buea, Bamenda and other cities.',
      reCta: 'View Listings',
      reCities: ['Yaoundé', 'Buea', 'Bamenda', 'Bafoussam', 'Limbe', 'More cities'],

      itPreviewTag: 'IT Services',
      itPreviewTitle: 'Development & Digital Solutions',
      itPreviewSubtitle: 'Modern technologies to propel your business online.',

      rePreviewTag: 'Real Estate',
      rePreviewTitle: 'Available Land in Cameroon',
      rePreviewSubtitle: 'Yaoundé, Buea, Bamenda and more. All with verified land titles.',

      whyTag: 'Why Choose Us',
      whyTitle: 'Trust, Expertise & Excellence',
      whySubtitle: 'Great Rift Consultancy combines expertise, integrity and passion to help clients succeed.',
      whyItems: [
        { icon: '🏆', title: 'Strong Reputation', text: 'A track record of success and client satisfaction that has earned trust across the community.' },
        { icon: '🎯', title: 'Complete Services', text: 'IT, real estate, immigration, education — all your needs under one roof.' },
        { icon: '💡', title: 'Proven Expertise', text: 'Seasoned professionals who understand the nuances of each sector and deliver tailored solutions.' },
        { icon: '🤝', title: 'Full Integrity', text: 'Honesty, transparency and ethics at every step of our collaboration.' },
        { icon: '⭐', title: 'Constant Excellence', text: 'High standards of professionalism pushing us to exceed expectations on every project.' },
        { icon: '🌍', title: 'International Reach', text: 'A network spanning 20+ countries to connect you with the best opportunities worldwide.' },
      ],

      aboutTag: 'About Us',
      aboutTitle: 'Your Trusted Partner in Cameroon',
      aboutDesc1: 'Great Rift Consultancy is a Cameroonian company specialising in software development and real estate. We support individuals and businesses in achieving their goals.',
      aboutDesc2: 'Our vision: to be the reference partner for digital transformation and real estate investment in Cameroon and Central Africa.',
      aboutLearnMore: 'Learn More',
      aboutContact: 'Contact Us',
      aboutCards: [
        { title: 'Our Vision', text: 'To be the leader in digital transformation and real estate in Cameroon.' },
        { title: 'Our Mission', text: 'Deliver quality IT solutions and certified land at fair prices.' },
        { title: 'Our Values', text: 'Integrity, transparency, excellence and client-centric service.' },
        { title: 'Our Impact', text: '200+ IT projects delivered and 50+ plots sold with 98% satisfaction.' },
      ],

      teamTag: 'Our Team',
      teamTitle: 'The Experts Behind Your Success',
      teamCta: 'Meet the Full Team',

      communityTag: 'Community',
      communityTitle: 'Join the Conversation',

      itServicesList: [
        { title: 'Websites', desc: 'Corporate, e-commerce, portfolio — modern and optimised.' },
        { title: 'Web Applications', desc: 'SaaS, CRM, ERP — custom business solutions.' },
        { title: 'Mobile Apps', desc: 'iOS & Android with Flutter and React Native.' },
        { title: 'SEO & Marketing', desc: 'Google ranking for greater online visibility.' },
        { title: 'Hosting', desc: 'Fast, secure cloud hosting with SSL included.' },
        { title: 'Pro Email & Domain', desc: 'Your professional address @yourbusiness.com.' },
      ],

      viewAll: 'View All',
      viewLands: 'View All Listings',
      viewTeam: 'Meet Full Team',
    },

    // IT Services page
    it: {
      heroTag: 'IT Services',
      heroTitle: 'Transform Your Business',
      heroTitleAccent: 'with Technology',
      heroDesc: 'We build modern websites, web applications and mobile apps that grow your business — with SEO, professional email, domain and hosting all included.',
      heroCta: 'Get a Free Quote',
      heroCall: 'Call Us Now',

      whyUs: [
        { title: 'Fast Delivery', desc: 'Most projects delivered within 1–4 weeks.' },
        { title: 'Secure Code', desc: 'Security-first development, OWASP compliant.' },
        { title: 'SEO-Ready', desc: 'Every site we build is optimised for search engines.' },
        { title: 'Modern Stack', desc: 'Latest technologies for performance and scale.' },
      ],

      servicesTag: 'What We Offer',
      servicesTitle: 'Complete IT Solutions',
      servicesSubtitle: 'From a simple landing page to a full enterprise application — we build it all with modern technologies and best practices.',

      services: [
        { title: 'Website Development', desc: 'Professional corporate websites, e-commerce stores, portfolios and landing pages built for performance and conversion.', features: ['Corporate Sites', 'E-commerce Stores', 'Portfolio Sites', 'Landing Pages', 'Blog & CMS'] },
        { title: 'Web Applications', desc: 'Custom web apps, SaaS platforms, CRM and ERP systems — scalable solutions that power your business operations.', features: ['Custom SaaS', 'CRM / ERP', 'Admin Dashboards', 'API Integrations', 'Real-time Apps'] },
        { title: 'Mobile Applications', desc: 'Cross-platform mobile apps for iOS and Android using Flutter and React Native with modern UX.', features: ['iOS & Android', 'Flutter Apps', 'React Native', 'App Store Deploy', 'Push Notifications'] },
        { title: 'SEO Optimisation', desc: 'Rank higher on Google. We optimise your site for search engines to drive consistent organic traffic.', features: ['Technical SEO', 'On-Page SEO', 'Keyword Research', 'Analytics Setup', 'Core Web Vitals'] },
        { title: 'Professional Email & Domain', desc: 'Get a custom domain and professional email (you@yourcompany.com) that builds trust with clients.', features: ['Custom Domain', 'Business Email', 'DNS Configuration', 'SSL Certificate', 'Email Migration'] },
        { title: 'Hosting & Deployment', desc: 'Fast, secure and reliable cloud hosting. We handle the infrastructure so you can focus on growth.', features: ['Cloud Hosting', 'VPS Servers', 'CDN & Speed', 'HTTPS / SSL', '24/7 Monitoring'] },
      ],

      techTag: 'Technologies',
      techTitle: 'Modern Tech Stack',
      techSubtitle: 'We use the latest and most reliable technologies to build fast, scalable and maintainable solutions.',

      processTag: 'How It Works',
      processTitle: 'Our Process',
      processSubtitle: 'Simple, transparent and collaborative — from first call to launch.',
      process: [
        { step: '01', title: 'Discovery Call', desc: 'We listen to your needs, goals and vision for the project.' },
        { step: '02', title: 'Proposal & Design', desc: 'We deliver a detailed proposal with mockups and timeline.' },
        { step: '03', title: 'Development', desc: 'Our team builds your solution with clean, modern code.' },
        { step: '04', title: 'Testing & Review', desc: 'Thorough testing across devices and browsers before launch.' },
        { step: '05', title: 'Launch', desc: 'We deploy, configure your domain, SSL and go live.' },
        { step: '06', title: 'Support & Growth', desc: 'Ongoing support, updates and SEO to keep you growing.' },
      ],

      ctaTitle: 'Ready to Build Something Great?',
      ctaDesc: 'Contact us for a free consultation. We\'ll analyse your needs and give you a transparent quote within 24 hours.',
      ctaBtn: 'Request a Quote',
      ctaWhatsApp: 'WhatsApp Us',
    },

    // Real Estate page
    re: {
      heroTag: 'Real Estate Cameroon',
      heroTitle: 'Your Ideal Land',
      heroTitleAccent: 'in Cameroon',
      heroDesc: 'Residential, commercial and agricultural land in Yaoundé, Buea, Bamenda and other cities. All with verified land titles.',
      heroCta: 'View Listings',

      stats: ['Available plots', 'Cities covered', 'Land titles verified', 'Response guaranteed'],

      listingsTag: 'Our Listings',
      listingsTitle: 'Available Land',
      listingsSubtitle: 'Browse our offers in the best areas of Cameroon. Contact us to arrange a visit.',

      filterAll: 'All',
      resultsFound: 'plot(s) found',
      resultsIn: 'in',

      price: 'Price',
      size: 'Size',
      type: 'Type',

      servicesTag: 'Our Services',
      servicesTitle: 'Full Support',
      supportServices: [
        { icon: '🔍', title: 'Land Search', desc: 'We find the plot that matches your budget, location and project.' },
        { icon: '📋', title: 'Legal Verification', desc: 'Full check of the land title and legal documents before any purchase.' },
        { icon: '🤝', title: 'Price Negotiation', desc: 'Our team negotiates the best price on your behalf.' },
        { icon: '📝', title: 'Contract Drafting', desc: 'Support for drafting and signing the sale deed.' },
        { icon: '🏛️', title: 'Title Transfer', desc: 'Complete management of land title transfer to your name.' },
        { icon: '🌍', title: 'Diaspora & Investors', desc: 'Dedicated service for Cameroonians abroad and foreign investors.' },
      ],

      ctaTitle: 'Looking for land in Cameroon?',
      ctaDesc: 'Contact us now. We help you find, verify and acquire your land safely.',
      ctaBtn: 'Contact Us',

      lands: [
        { title: 'Residential plot in Mvan', zone: 'Mvan, 7th district', type: 'Residential', features: ['Land title', 'Tarmac road', 'Electricity', 'Running water'] },
        { title: 'Large plot in Odza', zone: 'Odza, Yaoundé VI', type: 'Residential / Commercial', features: ['Land title', 'Easy access', 'Quiet area', 'Surveyed'] },
        { title: 'Commercial plot in Bastos', zone: 'Bastos, Yaoundé', type: 'Commercial', features: ['Land title', 'Commercial area', 'Main road', 'Near embassies'] },
        { title: 'Plot in Biyem-Assi', zone: 'Biyem-Assi, Yaoundé VI', type: 'Residential', features: ['Ownership certificate', 'Residential area', 'Transport nearby'] },
        { title: 'Plot with Mount Cameroon view', zone: 'Great Soppo, Buea', type: 'Residential', features: ['Open view', 'Cool climate', 'Residential area', 'Road access'] },
        { title: 'Plot in Molyko', zone: 'Molyko, Buea', type: 'Residential / Rental', features: ['Near university', 'Electricity', 'Running water', 'Lively area'] },
        { title: 'Commercial plot Buea Town', zone: 'Buea Town, Centre', type: 'Commercial', features: ['Strategic position', 'Commercial area', 'Land title', 'National road access'] },
        { title: 'Large plot on Commercial Avenue', zone: 'Commercial Avenue, Bamenda I', type: 'Commercial', features: ['Commercial area', 'Land title', 'Electricity', 'Tarmac road'] },
        { title: 'Residential plot in Up Station', zone: 'Up Station, Bamenda', type: 'Residential', features: ['Panoramic view', 'Residential area', 'Road access', 'Surveyed'] },
        { title: 'Plot in Nkwen', zone: 'Nkwen, Bamenda III', type: 'Residential', features: ['Quiet area', 'Electricity', 'Water', 'Road access'] },
        { title: 'Agricultural land in Bafoussam', zone: 'Bafoussam, West', type: 'Agricultural', features: ['Fertile soil', 'Water access', 'Agricultural zone', 'Land title'] },
        { title: 'Plot in Limbe (Beach Road)', zone: 'Beach Road, Limbe', type: 'Residential / Tourism', features: ['Near the sea', 'Tourist area', 'High potential', 'Land title'] },
      ],
    },

    common: {
      callUs: 'Call Us',
      whatsapp: 'WhatsApp',
      learnMore: 'Learn More',
      viewAll: 'View All',
      contactUs: 'Contact Us',
      getQuote: 'Get a Quote',
    },
  },

  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      contact: 'Contact',
      more: 'Plus',
      team: '👥 Équipe',
      projects: '📁 Projets',
      partners: '🤝 Partenaires',
      testimonials: '⭐ Témoignages',
      services: '🗂️ Nos Services',
      itServices: 'IT Services',
      realEstate: 'Immobilier',
    },

    home: {
      sectorTag: 'Nos Domaines',
      sectorTitle: 'Choisissez Votre Secteur',
      sectorSubtitle: 'Great Rift Consultancy opère dans deux secteurs clés. Cliquez sur le domaine qui vous intéresse.',

      itTag: 'IT Services',
      itTitle: 'Solutions Digitales & Développement',
      itDesc: 'Sites web, applications mobiles, SEO, email professionnel, hébergement — tout ce dont votre entreprise a besoin pour réussir en ligne.',
      itCta: 'Voir nos services IT',
      itServices: ['Sites Web', 'Web Apps', 'Mobile Apps', 'SEO', 'Email Pro', 'Hébergement'],

      reTag: 'Immobilier',
      reTitle: 'Terrains & Propriétés au Cameroun',
      reDesc: "Achetez ou investissez dans des terrains résidentiels, commerciaux et agricoles à Yaoundé, Buea, Bamenda et dans d'autres villes.",
      reCta: 'Voir les terrains',
      reCities: ['Yaoundé', 'Buea', 'Bamenda', 'Bafoussam', 'Limbe', 'Autres villes'],

      itPreviewTag: 'IT Services',
      itPreviewTitle: 'Développement & Solutions Digitales',
      itPreviewSubtitle: 'Des technologies modernes pour propulser votre entreprise en ligne.',

      rePreviewTag: 'Immobilier',
      rePreviewTitle: 'Terrains Disponibles au Cameroun',
      rePreviewSubtitle: "Yaoundé, Buea, Bamenda et d'autres villes. Tous titres fonciers vérifiés.",

      whyTag: 'Pourquoi Nous Choisir',
      whyTitle: 'Confiance, Expertise & Excellence',
      whySubtitle: 'Great Rift Consultancy combine expertise, intégrité et passion pour aider ses clients à réussir.',
      whyItems: [
        { icon: '🏆', title: 'Réputation Solide', text: "Un bilan de réussites et de satisfaction client qui nous vaut la confiance de centaines d'entreprises." },
        { icon: '🎯', title: 'Services Complets', text: "IT, immobilier, immigration, éducation — tous vos besoins sous un même toit." },
        { icon: '💡', title: 'Expertise Reconnue', text: "Des professionnels aguerris qui comprennent les nuances de chaque secteur et livrent des solutions sur mesure." },
        { icon: '🤝', title: 'Intégrité Totale', text: "Honnêteté, transparence et éthique à chaque étape de notre collaboration." },
        { icon: '⭐', title: 'Excellence Constante', text: "Des standards élevés de professionnalisme qui nous poussent à dépasser les attentes à chaque projet." },
        { icon: '🌍', title: 'Portée Internationale', text: "Un réseau couvrant 20+ pays pour vous connecter aux meilleures opportunités à travers le monde." },
      ],

      aboutTag: 'À Propos de Nous',
      aboutTitle: 'Votre Partenaire de Confiance au Cameroun',
      aboutDesc1: 'Great Rift Consultancy est une entreprise camerounaise spécialisée dans le développement logiciel et l\'immobilier. Nous accompagnons particuliers et entreprises vers leurs objectifs.',
      aboutDesc2: 'Notre vision : être le partenaire de référence pour la transformation digitale et l\'investissement immobilier au Cameroun et en Afrique centrale.',
      aboutLearnMore: 'En savoir plus',
      aboutContact: 'Nous contacter',
      aboutCards: [
        { title: 'Notre Vision', text: "Être le leader de la transformation digitale et de l'immobilier au Cameroun." },
        { title: 'Notre Mission', text: 'Fournir des solutions IT de qualité et des terrains certifiés à des prix justes.' },
        { title: 'Nos Valeurs', text: "Intégrité, transparence, excellence et service centré sur le client." },
        { title: 'Notre Impact', text: '200+ projets IT livrés et 50+ terrains vendus avec 98% de satisfaction.' },
      ],

      teamTag: 'Notre Équipe',
      teamTitle: "Les Experts Derrière Votre Succès",
      teamCta: "Voir toute l'équipe",

      communityTag: 'Communauté',
      communityTitle: 'Rejoignez la Conversation',

      itServicesList: [
        { title: 'Sites Web', desc: 'Vitrine, e-commerce, portfolio — modernes et optimisés.' },
        { title: 'Web Applications', desc: 'SaaS, CRM, ERP — solutions métier sur mesure.' },
        { title: 'Apps Mobiles', desc: 'iOS & Android avec Flutter et React Native.' },
        { title: 'SEO & Marketing', desc: 'Référencement Google pour plus de visibilité.' },
        { title: 'Hébergement', desc: 'Hosting rapide, sécurisé et SSL inclus.' },
        { title: 'Email Pro & Domaine', desc: 'Votre adresse pro @votreboite.com.' },
      ],

      viewAll: 'Voir tout',
      viewLands: 'Voir tous les terrains',
      viewTeam: "Voir toute l'équipe",
    },

    it: {
      heroTag: 'IT Services',
      heroTitle: 'Transformez Votre Entreprise',
      heroTitleAccent: 'avec la Technologie',
      heroDesc: 'Nous construisons des sites web modernes, des applications web et mobiles qui font croître votre entreprise — avec SEO, email professionnel, domaine et hébergement inclus.',
      heroCta: 'Devis Gratuit',
      heroCall: 'Appelez-nous',

      whyUs: [
        { title: 'Livraison Rapide', desc: 'La plupart des projets livrés en 1 à 4 semaines.' },
        { title: 'Code Sécurisé', desc: 'Développement axé sécurité, conforme OWASP.' },
        { title: 'Prêt pour le SEO', desc: 'Chaque site que nous construisons est optimisé pour Google.' },
        { title: 'Stack Moderne', desc: 'Dernières technologies pour la performance et la montée en charge.' },
      ],

      servicesTag: 'Ce que Nous Proposons',
      servicesTitle: 'Solutions IT Complètes',
      servicesSubtitle: "D'une simple landing page à une application d'entreprise — nous construisons tout avec des technologies modernes.",

      services: [
        { title: 'Développement de Sites Web', desc: 'Sites corporatifs, boutiques e-commerce, portfolios et pages de destination optimisés pour la performance.', features: ['Sites Corporatifs', 'E-commerce', 'Portfolio', 'Landing Pages', 'Blog & CMS'] },
        { title: 'Applications Web', desc: 'Applications web sur mesure, plateformes SaaS, CRM et ERP — des solutions évolutives pour vos opérations.', features: ['SaaS sur mesure', 'CRM / ERP', 'Tableaux de bord', 'Intégrations API', 'Apps temps réel'] },
        { title: 'Applications Mobiles', desc: 'Applications mobiles multiplateformes pour iOS et Android avec Flutter et React Native.', features: ['iOS & Android', 'Flutter', 'React Native', 'Déploiement App Store', 'Notifications Push'] },
        { title: 'Optimisation SEO', desc: 'Montez dans les résultats Google. Nous optimisons votre site pour générer du trafic organique régulier.', features: ['SEO Technique', 'SEO On-Page', 'Recherche de mots-clés', 'Google Analytics', 'Core Web Vitals'] },
        { title: 'Email Pro & Domaine', desc: 'Obtenez un domaine personnalisé et un email professionnel (vous@votreboite.com) qui inspire confiance.', features: ['Nom de domaine', 'Email professionnel', 'Configuration DNS', 'Certificat SSL', 'Migration email'] },
        { title: 'Hébergement & Déploiement', desc: 'Hébergement cloud rapide, sécurisé et fiable. Nous gérons l\'infrastructure pour que vous puissiez vous concentrer sur la croissance.', features: ['Cloud Hosting', 'Serveurs VPS', 'CDN & Vitesse', 'HTTPS / SSL', 'Monitoring 24/7'] },
      ],

      techTag: 'Technologies',
      techTitle: 'Stack Technologique Moderne',
      techSubtitle: 'Nous utilisons les technologies les plus récentes et fiables pour construire des solutions rapides, évolutives et maintenables.',

      processTag: 'Comment Ça Marche',
      processTitle: 'Notre Processus',
      processSubtitle: 'Simple, transparent et collaboratif — du premier appel au lancement.',
      process: [
        { step: '01', title: 'Appel de Découverte', desc: 'Nous écoutons vos besoins, objectifs et vision du projet.' },
        { step: '02', title: 'Proposition & Design', desc: 'Nous livrons une proposition détaillée avec maquettes et calendrier.' },
        { step: '03', title: 'Développement', desc: 'Notre équipe construit votre solution avec un code propre et moderne.' },
        { step: '04', title: 'Tests & Révision', desc: 'Tests approfondis sur tous les appareils et navigateurs avant le lancement.' },
        { step: '05', title: 'Lancement', desc: 'Nous déployons, configurons votre domaine, SSL et mettons en ligne.' },
        { step: '06', title: 'Support & Croissance', desc: 'Support continu, mises à jour et SEO pour vous faire grandir.' },
      ],

      ctaTitle: 'Prêt à Construire Quelque Chose de Grand ?',
      ctaDesc: 'Contactez-nous pour une consultation gratuite. Nous analyserons vos besoins et vous donnerons un devis transparent sous 24h.',
      ctaBtn: 'Demander un Devis',
      ctaWhatsApp: 'WhatsApp',
    },

    re: {
      heroTag: 'Immobilier Cameroun',
      heroTitle: 'Votre Terrain Idéal',
      heroTitleAccent: 'au Cameroun',
      heroDesc: "Terrains résidentiels, commerciaux et agricoles à Yaoundé, Buea, Bamenda et dans d'autres villes du Cameroun. Tous avec titres fonciers.",
      heroCta: 'Voir les terrains',

      stats: ['Terrains disponibles', 'Villes couvertes', 'Titres fonciers', 'Réponse garantie'],

      listingsTag: 'Nos Annonces',
      listingsTitle: 'Terrains Disponibles',
      listingsSubtitle: 'Parcourez nos offres dans les meilleures zones du Cameroun. Contactez-nous pour visiter.',

      filterAll: 'Tous',
      resultsFound: 'terrain(s) trouvé(s)',
      resultsIn: 'à',

      price: 'Prix',
      size: 'Superficie',
      type: 'Type',

      servicesTag: 'Nos Services',
      servicesTitle: 'Accompagnement Complet',
      supportServices: [
        { icon: '🔍', title: 'Recherche de Terrain', desc: 'Nous cherchons le terrain qui correspond à votre budget, zone et projet.' },
        { icon: '📋', title: 'Vérification Juridique', desc: "Contrôle complet du titre foncier et des documents légaux avant tout achat." },
        { icon: '🤝', title: 'Négociation du Prix', desc: 'Notre équipe négocie le meilleur prix en votre faveur.' },
        { icon: '📝', title: 'Rédaction du Contrat', desc: "Accompagnement pour la rédaction et la signature des actes de vente." },
        { icon: '🏛️', title: 'Mutation & Transfert', desc: 'Gestion complète du transfert de titre foncier à votre nom.' },
        { icon: '🌍', title: 'Diaspora & Investisseurs', desc: "Service dédié aux Camerounais de l'extérieur et aux investisseurs étrangers." },
      ],

      ctaTitle: 'Vous cherchez un terrain au Cameroun ?',
      ctaDesc: 'Contactez-nous dès maintenant. Nous vous aidons à trouver, vérifier et acquérir votre terrain en toute sécurité.',
      ctaBtn: 'Nous contacter',

      lands: [
        { title: 'Terrain résidentiel à Mvan', zone: 'Mvan, 7ème arrondissement', type: 'Résidentiel', features: ['Titre foncier', 'Route bitumée', 'Électricité', 'Eau courante'] },
        { title: 'Grande parcelle à Odza', zone: 'Odza, Yaoundé VI', type: 'Résidentiel / Commercial', features: ['Titre foncier', 'Accès facile', 'Zone calme', 'Bornage fait'] },
        { title: 'Terrain commercial à Bastos', zone: 'Bastos, Yaoundé', type: 'Commercial', features: ['Titre foncier', 'Zone commerciale', 'Route principale', 'Vis-à-vis ambassades'] },
        { title: 'Terrain à Biyem-Assi', zone: 'Biyem-Assi, Yaoundé VI', type: 'Résidentiel', features: ['Certificat de propriété', 'Quartier résidentiel', 'Transports proches'] },
        { title: 'Terrain vue sur le Mont Cameroun', zone: 'Great Soppo, Buea', type: 'Résidentiel', features: ['Vue dégagée', 'Climat frais', 'Zone résidentielle', 'Route accessible'] },
        { title: 'Parcelle à Molyko', zone: 'Molyko, Buea', type: 'Résidentiel / Locatif', features: ['Près université', 'Électricité', 'Eau courante', 'Zone animée'] },
        { title: 'Terrain commercial Buea Town', zone: 'Buea Town, Centre', type: 'Commercial', features: ['Position stratégique', 'Zone commerciale', 'Titre foncier', 'Route nationale'] },
        { title: 'Grande parcelle à Commercial Avenue', zone: 'Commercial Avenue, Bamenda I', type: 'Commercial', features: ['Zone commerciale', 'Titre foncier', 'Électricité', 'Route bitumée'] },
        { title: 'Terrain résidentiel à Up Station', zone: 'Up Station, Bamenda', type: 'Résidentiel', features: ['Vue panoramique', 'Quartier résidentiel', 'Accès routier', 'Bornage fait'] },
        { title: 'Parcelle à Nkwen', zone: 'Nkwen, Bamenda III', type: 'Résidentiel', features: ['Zone calme', 'Électricité', 'Eau', 'Route accessible'] },
        { title: 'Terrain agricole à Bafoussam', zone: 'Bafoussam, Ouest', type: 'Agricole', features: ['Sol fertile', 'Accès eau', 'Zone agricole', 'Titre foncier'] },
        { title: 'Terrain à Limbe (Beach Road)', zone: 'Beach Road, Limbe', type: 'Résidentiel / Touristique', features: ['Proximité mer', 'Zone touristique', 'Fort potentiel', 'Titre foncier'] },
      ],
    },

    common: {
      callUs: 'Appeler',
      whatsapp: 'WhatsApp',
      learnMore: 'En savoir plus',
      viewAll: 'Voir tout',
      contactUs: 'Nous contacter',
      getQuote: 'Devis gratuit',
    },
  },
};

export default t;
