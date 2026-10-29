// ==========================================
// 1. STATE & PARAMS (100% USD ONLY · DEFAULT ENGLISH)
// ==========================================
const urlParams = new URLSearchParams(window.location.search);
const initialLang = urlParams.get('lang') || 'en'; // Default language: English

const STATE = {
  lang: ['en', 'es', 'ru'].includes(initialLang) ? initialLang : 'en',
  calcTab: 'gold',
  dealerMargin: 4.8, // 4.8% below spot

  // Gold state
  goldPurity: 0.585,
  goldPurityLabel: '585° (14K)',
  goldCategoryMult: 1.0,
  goldCategoryId: 'jewelry',
  goldWeight: 24.5,

  // Watch state
  watchBaseUsd: 11200,
  watchName: 'Rolex Submariner Date 41mm (Ref. 126610LN)',
  watchSetMult: 1.0,
  watchSetId: 'full',
  watchCondMult: 1.0,
  watchCondId: 'excellent',

  // Silver state
  silverMetal: 'ag925',
  silverWeight: 250,

  // Base spot prices in USD
  spotAuUsdPerGram: 88.36, // ~$2,748.50 / 31.1035g
  spotAgUsdPerGram: 1.02,
  spotPtUsdPerGram: 32.15
};

const PURITIES_TABLE = [
  {
    code: '375°',
    karat: '9 Karat',
    purity: 0.375,
    examples: {
      es: 'Anillos 9K, cadenas ligeras europeas, pendientes vintage',
      en: '9K rings, lightweight European chains, earrings',
      ru: 'Европейские и британские кольца, легкие цепочки, серьги'
    }
  },
  {
    code: '500°',
    karat: '12 Karat',
    purity: 0.500,
    examples: {
      es: 'Joyería de 12K, cajas de relojes antiguos, aleaciones especiales',
      en: '12K vintage jewelry, watch cases, custom alloys',
      ru: 'Винтажные украшения, оправы, изделия нестандартной пробы'
    }
  },
  {
    code: '585° / 583°',
    karat: '14 Karat',
    purity: 0.585,
    examples: {
      es: 'El estándar más habitual: alianzas 14K, cadenas cubanas, pulseras',
      en: 'Most common 14K jewelry: chains, wedding bands, bracelets',
      ru: 'Основной стандарт: современные и советские кольца, цепи, браслеты'
    }
  },
  {
    code: '750°',
    karat: '18 Karat',
    purity: 0.750,
    examples: {
      es: 'Alta joyería, piezas Cartier / Bvlgari, cajas de relojes suizos',
      en: '18K fine jewelry, luxury watch cases, designer pieces',
      ru: 'Премиальные украшения, изделия Cartier / Bvlgari, корпуса часов'
    }
  },
  {
    code: '900° / 916°',
    karat: '21.6K / 22K',
    purity: 0.900,
    examples: {
      es: 'Monedas bullion (Centenario, Eagle, Soberano) y oro dental',
      en: 'Coin gold (Centenario, pre-1933 US gold, Sovereign), dental gold',
      ru: 'Инвестиционные и царские монеты (Червонец, Eagle), стоматологическое золото'
    }
  },
  {
    code: '999.9°',
    karat: '24 Karat',
    purity: 0.999,
    examples: {
      es: 'Lingotes bancarios de inversión (PAMP, Valcambi, Argor) y monedas puras',
      en: '24K investment bullion bars (PAMP, Perth, Valcambi) & .9999 coins',
      ru: 'Банковские мерные слитки (Argor-Heraeus, PAMP) и монеты 999°'
    }
  }
];

const I18N = {
  es: {
    page_title: 'Oficina Privada de Tasación · Oro, Plata y Relojes Suizos',
    spot_label: 'FIJACIÓN LBMA / COMEX EN VIVO:',
    spot_au_name: 'AU 999.9 (Oro)',
    spot_ag_name: 'AG 999 (Plata)',
    spot_pt_name: 'PT 950 (Platino)',
    spot_oz_name: '1 Onza Troy (31.1035 g)',
    spot_updated_text: 'Cotizaciones en tiempo real · Fixing internacional',
    brand_title: 'MESA PRIVADA DE TASACIÓN',
    brand_subtitle: 'ORO · PLATA · RELOJES SUIZOS · PRÉSTAMOS',
    header_cta: 'Oferta en Efectivo',
    nav_calc: 'Calculadora en Vivo',
    nav_gold: 'Precios por Gramo',
    nav_watches: 'Relojes Suizos',
    nav_silver: 'Plata y Lingotes',
    nav_loans: 'Préstamos Prendarios',
    nav_protocol: 'Protocolo de Ensayo',
    nav_contact: 'Tasación por Foto y Despacho',
    hero_eyebrow: 'Downtown Miami · Evaluación Inmediata · Pago el Mismo Día',
    hero_title: 'Venda oro, plata y relojes suizos al precio spot del mercado.',
    hero_lead: 'Traiga sus piezas para una tasación gratuita no destructiva por espectrometría XRF y una oferta clara en efectivo. Sin ácidos ni raspaduras, pesaje transparente frente a usted y pago inmediato durante su visita.',
    hero_btn_primary: 'Calcular oferta en efectivo',
    hero_btn_whatsapp: 'Enviar fotos por WhatsApp',
    trust_1: 'Sin cita previa (Walk-ins bienvenidos)',
    trust_2: 'Tasación XRF gratuita',
    trust_3: 'Sin obligación de venta',
    hero_address: '174 E Flagler St, Miami · Lun–Sáb, 9:00–20:00 · Sala de Seguridad Privada',
    badge_no_acid: 'Sin cortes ni ácidos',
    badge_cash_desk: 'Fondo de caja hasta $250,000',
    photo_caption_title: 'Una oferta real. En persona.',
    photo_caption_sub: 'Báscula certificada de precisión Clase I (0.01 g) · Precio spot en tiempo real',
    scale_pill_label: 'Oro 14K (585°) hoy',
    ledger_1_title: 'Sobre el precio spot de mercado',
    ledger_1_desc: 'Fórmula de tasación transparente ligada al fixing de bolsa internacional, sin comisiones ocultas por merma.',
    ledger_2_title: 'Precisión metrológica certificada',
    ledger_2_desc: 'Básculas de laboratorio Ohaus con pantalla digital dual orientada al cliente y calibración periódica oficial.',
    ledger_3_title: 'Análisis espectral no destructivo',
    ledger_3_desc: 'Determinamos la composición exacta de la aleación mediante fluorescencia de rayos X sin rayar su pieza.',
    ledger_4_title: 'Liquidación en efectivo o transferencia',
    ledger_4_desc: 'Pago en efectivo verificado con contador bancario, transferencia wire inmediata o criptoactivos (USDT).',
    calc_kicker: '01 / CALCULADORA INTERACTIVA DE PAGO',
    calc_title: 'Cálculo de oferta vinculado al precio spot',
    calc_subtitle: 'Seleccione la pureza del oro, peso o modelo de reloj. Conozca su oferta neta y fije la cotización durante 3 horas mientras acude a nuestro despacho.',
    tab_gold_title: 'Oro y Joyería Fina',
    tab_gold_sub: '375° · 585° · 750° · 900° · 999.9°',
    tab_watches_title: 'Relojes Suizos de Lujo',
    tab_watches_sub: 'Rolex · Patek Philippe · AP · Cartier',
    tab_silver_title: 'Plata, Platino y Monedas',
    tab_silver_sub: '875° · 925° · 999° · Pt 950°',
    lbl_select_purity: '1. Seleccione la pureza del oro (Quilates)',
    lbl_item_category: '2. Tipo de pieza y categoría',
    lbl_item_category_hint: 'Determina el factor de tasación',
    cat_jewelry: 'Joyería fina, cadenas, anillos',
    cat_rate_base: 'Tarifa base',
    cat_scrap: 'Oro chatarra / piezas rotas',
    cat_rate_melt: 'Por metal fino',
    cat_bullion: 'Lingotes y monedas de inversión',
    cat_branded: 'Joyería de marca (Cartier, VCA)',
    lbl_weight: '3. Peso total (en gramos)',
    lbl_tier_hint: 'A partir de 30 g aplica tarifa mayorista (+2%)',
    unit_grams: 'gramos (g)',
    preset_ring: '5.5 g (Anillo)',
    preset_chain: '24.5 g (Cadena)',
    preset_bar: '100 g (Lingote)',
    lbl_watch_model: '1. Seleccione la manufactura y referencia',
    lbl_watch_index_hint: 'Índice en tiempo real Chrono24',
    lbl_watch_set: '2. Dotación (Caja y Documentación)',
    watch_set_full: 'Set Completo (Caja + Garantía)',
    watch_set_papers: 'Reloj + Documentos (sin caja)',
    watch_set_box: 'Reloj + Caja (sin tarjeta)',
    watch_set_only: 'Solo el reloj (Watch only)',
    lbl_watch_cond: '3. Estado de conservación',
    watch_cond_unworn: 'Nuevo / Sin estrenar (Unworn)',
    watch_cond_excellent: 'Excelente (sin pulido)',
    watch_cond_good: 'Marcas normales de uso',
    watch_cond_service: 'Requiere revisión mecánica',
    lbl_silver_metal: '1. Seleccione metal y pureza',
    silver_925: 'Plata 925° (Sterling / Joyas)',
    silver_999: 'Plata 999° (Lingotes y monedas)',
    silver_875: 'Plata 875° (Vintage y vajilla)',
    plat_950: 'Platino 950° (Platinum)',
    lbl_silver_weight: '2. Peso del lote (en gramos)',
    preset_set: '250 g (Juego)',
    preset_kilo: '1 000 g (1 kg)',
    receipt_header: 'ESPECIFICACIÓN DE LA OFERTA',
    receipt_live: 'Cotización spot oficial',
    rec_lbl_1: 'Activo y pureza',
    rec_lbl_2: 'Categoría de tasación',
    rec_lbl_3: 'Contenido de metal fino',
    rec_lbl_4: 'Precio neto por 1g',
    rec_lbl_5: 'Deducciones por merma',
    rec_no_deductions: '0% (Sin deducciones)',
    payout_label: 'OFERTA NETA ESTIMADA EN EL ACTO',
    payout_method: 'Efectivo en caja, transferencia wire o USDT',
    loan_alt_title: '¿Prefiere no vender su pieza definitivamente?',
    loan_alt_sub: 'Disponible como préstamo garantizado en bóveda asegurada (0.28% diario)',
    btn_lock_rate: 'Fijar cotización por 3 horas',
    btn_send_calc: 'Enviar cálculo a mi WhatsApp',
    receipt_footnote: '* Al fijar la cotización se emite un código de reserva: si el oro baja mientras viene a la oficina, le pagamos el valor acordado.',
    rates_kicker: '02 / PIZARRA OFICIAL DE COMPRA',
    rates_title: 'Precios de compra de oro por gramo',
    rates_subtitle: 'Precios netos transparentes vinculados al fixing internacional. Haga clic en cualquier pureza para cargarla en la calculadora.',
    th_purity: 'Pureza / Quilates',
    th_examples: 'Piezas habituales',
    th_std: 'Estándar (< 30g)',
    th_vip: 'Mayoristas (30g+)',
    th_bullion: 'Lingotes / Marcas',
    th_action: 'Acción',
    th_calc_btn: 'Calcular →',
    dirs_kicker: '03 / ESPECIALIZACIÓN DE NUESTRA OFICINA',
    dirs_title: 'Cuatro áreas de gestión de activos de lujo',
    dirs_subtitle: 'Evaluamos no solo el peso del metal puro, sino la liquidez relojera, diamantes certificados y valor coleccionable.',
    card_1_title: 'Oro de joyería, chatarra, monedas y lingotes',
    card_1_desc: 'Aceptamos piezas de 10K, 14K, 18K y 24K, cadenas rotas, oro dental, así como lingotes de banco certificados (PAMP, Valcambi, Argor) y monedas bullion (American Eagle, Krugerrand, Maple Leaf).',
    spec_1_k1: 'Método de ensayo',
    spec_1_v1: 'Espectrómetro XRF Olympus Vanta',
    spec_1_k2: 'Lingotes sin certificado',
    spec_1_v2: 'Compramos según ley 999.9° sin penalización',
    spec_1_k3: 'Piedras engastadas',
    spec_1_v3: 'Se tasan aparte o se devuelven intactas',
    card_2_title: 'Alta relojería suiza y cronógrafos de lujo',
    card_2_desc: 'Compramos Rolex, Patek Philippe, Audemars Piguet, Vacheron Constantin, Cartier y Omega. Inspección técnica realizada por maestro relojero sin comprometer la estanqueidad de la caja.',
    spec_2_k1: 'Referencia de mercado',
    spec_2_v1: 'Transacciones reales Chrono24 y bolsas privadas',
    spec_2_k2: 'Sin caja ni papeles',
    spec_2_v2: 'Aceptamos tras verificación en registros oficiales',
    spec_2_k3: 'Moneda de pago',
    spec_2_v3: 'USD · EUR · USDT en el mismo día',
    card_3_title: 'Diamantes GIA desde 0.30 ct y joyería de firmas',
    card_3_desc: 'No tratamos piezas de Cartier, Van Cleef & Arpels, Bvlgari o Graff como simple oro para fundir. Diamantes certificados y sueltos valorados según el listado internacional Rapaport.',
    spec_3_k1: 'Equipo gemológico',
    spec_3_v1: 'Yehuda Sherlock Holmes / Presidium',
    spec_3_k2: 'Prima por firma',
    spec_3_v2: 'Hasta +45% sobre el valor del metal',
    spec_3_k3: 'Gemas sin certificado',
    spec_3_v3: 'Diagnóstico gratuito en presencia del cliente',
    card_4_title: 'Liquidez mediante préstamos con garantía prendaria',
    card_4_desc: 'Si necesita liquidez temporal sin desprenderse de sus activos: préstamo prendario en 15 minutos. Sus piezas se precintan en su presencia y quedan en bóveda acorazada asegurada.',
    spec_4_k1: 'Historial crediticio',
    spec_4_v1: 'Sin verificación en burós de crédito',
    spec_4_k2: 'Seguro de custodia',
    spec_4_v2: '100% del valor de tasación cubierto',
    spec_4_k3: 'Cancelación anticipada',
    spec_4_v3: 'En cualquier momento sin penalización',
    proto_kicker: '04 / PROTOCOLO DE TASACIÓN',
    proto_title: 'Cómo funciona su visita y por qué pagamos más',
    proto_subtitle: 'El proceso toma entre 10 y 15 minutos en un despacho privado y confidencial, con máxima seguridad.',
    step_1_title: 'Visita sin cita o bloqueo de cotización online',
    step_1_text: 'Llegue cuando le convenga con su documento de identidad. Servicio de seguridad privado y atención individualizada en sala privada.',
    step_2_title: 'Análisis espectral XRF y pesaje certificado',
    step_2_text: 'En su presencia verificamos la ley del metal con espectrómetro Olympus Vanta. Cero ácidos ni cortes. La pantalla de la balanza siempre visible.',
    step_3_title: 'Propuesta abierta según el fixing de bolsa',
    step_3_text: 'Recibe un desglose por escrito con peso exacto y precio por gramo. Si no le convence, recupera sus piezas de inmediato. La tasación es 100% gratuita.',
    step_4_title: 'Liquidación inmediata en ventanilla',
    step_4_text: 'Si acepta, formalizamos el recibo legal de compra. Efectivo contado en caja o transferencia wire inmediata a su cuenta bancaria.',
    comp_title: 'Nuestra oficina frente a casas de empeño convencionales',
    comp_sub: 'Comparativa real con una cadena de oro 14K (585) de 35 gramos',
    comp_t1: '01 / ENSAYO DE PUREZA DEL METAL',
    comp_bad_1_t: 'Comercio tradicional:',
    comp_bad_1_d: 'limado profundo con raspador y ácido nítrico (daña el acabado de su joya).',
    comp_good_1_t: 'Nuestra oficina:',
    comp_good_1_d: 'espectrometría XRF en 15 segundos: 0% alteraciones físicas en su pieza.',
    comp_t2: '02 / DEDUCCIONES OCULTAS SOBRE EL PESO',
    comp_bad_2_t: 'Comercio tradicional:',
    comp_bad_2_d: 'descuentan entre 5% y 8% por «soldaduras, suciedad y muelle del cierre».',
    comp_good_2_t: 'Nuestra oficina:',
    comp_good_2_d: '0% comisiones por merma. Abonamos cada 0.01 g de peso bruto contrastado.',
    comp_t3: '03 / VALORACIÓN DE GEMAS Y MARCAS',
    comp_bad_3_t: 'Comercio tradicional:',
    comp_bad_3_d: 'anillos de firma y diamantes se computan a precio de chatarra o se descartan.',
    comp_good_3_t: 'Nuestra oficina:',
    comp_good_3_d: 'tasador gemológico abona sobreprecio por diamantes y manufactura de lujo.',
    comp_t4: '04 / PRIVACIDAD Y LÍMITES DE CAJA',
    comp_bad_4_t: 'Comercio tradicional:',
    comp_bad_4_d: 'mostrador expuesto a la calle con rejas; fondos limitados a montos pequeños.',
    comp_good_4_t: 'Nuestra oficina:',
    comp_good_4_d: 'despacho blindado privado, parking custodiado y reserva de caja inmediata de hasta $250k.',
    contact_kicker: '05 / VALORACIÓN POR FOTO Y CONTACTO',
    contact_title: 'Conozca el valor antes de venir a la oficina',
    contact_subtitle: 'Envíe fotos de sus piezas, sellos de pureza o reloj. Un tasador experto le responderá en 5 minutos con una oferta formal.',
    form_title: 'Tasación exprés por foto en 5 minutos',
    lbl_your_name: 'Su nombre',
    lbl_your_phone: 'Teléfono (WhatsApp / Celular)',
    lbl_item_desc: 'Descripción de la pieza, pureza o referencia del reloj',
    lbl_attach_photo: 'Fotografías de las piezas o contrastes (opcional)',
    upload_placeholder: '+ Adjuntar fotos (JPG, PNG, HEIC) o arrastre aquí',
    upload_security: 'Información confidencial cifrada de extremo a extremo',
    btn_submit_form: 'Solicitar tasación y fijar cotización',
    office_card_title: 'Despacho privado en el centro financiero',
    office_card_sub: 'Privacidad absoluta: acceso discreto sin carteles llamativos, estacionamiento vigilado y sala de operaciones blindada.',
    lbl_office_addr: 'DIRECCIÓN DE LA OFICINA',
    lbl_office_hours: 'HORARIO DE ATENCIÓN',
    lbl_office_phone: 'LÍNEA DIRECTA DEL TASADOR',
    contact_response_time: 'Atención inmediata por WhatsApp en 2–3 minutos',
    footer_legal: 'AU 999.9 · PRIVATE ASSAY & BUYING DESK',
    footer_disclaimer: 'Todas las tasaciones son conformes a los estándares internacionales de ensayo y metrología (LBMA / COMEX). Operaciones formalizadas con documento de identidad oficial.',
    footer_copy: '© 2026. Private Bullion & Timepiece Vault. All rights reserved.',
    modal_kicker: 'FIJACIÓN DE TASA POR 3 HORAS',
    modal_title: 'Bloquear cotización con su número',
    modal_desc: 'Recibirá el desglose oficial en su WhatsApp junto con el pase al estacionamiento privado.',
    modal_badge: 'Bloqueo 3 horas',
    btn_get_code: 'Obtener código de reserva de tasa →'
  },
  en: {
    page_title: 'Private Assay & Buying Desk · Gold, Silver & Swiss Timepieces',
    spot_label: 'LIVE LBMA / COMEX SPOT:',
    spot_au_name: 'AU 999.9 (Gold)',
    spot_ag_name: 'AG 999 (Silver)',
    spot_pt_name: 'PT 950 (Platinum)',
    spot_oz_name: '1 Troy Ounce (31.1035 g)',
    spot_updated_text: 'Live market prices · LBMA fixing feed',
    brand_title: 'PRIVATE ASSAY & BUYING DESK',
    brand_subtitle: 'GOLD · SILVER · WATCHES · COLLATERAL LOANS',
    header_cta: 'Get a Cash Offer',
    nav_calc: 'Live Calculator',
    nav_gold: 'Spot Rates per Gram',
    nav_watches: 'Swiss Watches',
    nav_silver: 'Silver & Bullion',
    nav_loans: 'Collateral Loans',
    nav_protocol: 'Appraisal Protocol',
    nav_contact: 'Photo Estimate & Showroom',
    hero_eyebrow: 'Downtown Miami · Walk-In Appraisal · Same-Day Cash Payout',
    hero_title: 'Sell gold, silver & luxury watches at live spot rates.',
    hero_lead: 'Bring your items for a free non-destructive XRF appraisal and a transparent cash offer tied to spot rates. No acid, open scale measurements right before you, and immediate payment during the same visit.',
    hero_btn_primary: 'Get a cash offer',
    hero_btn_whatsapp: 'Send photos on WhatsApp',
    trust_1: 'No appointment needed',
    trust_2: 'Free XRF appraisal',
    trust_3: 'No obligation to sell',
    hero_address: '174 E Flagler St, Miami · Mon–Sat, 9AM–8PM · Private Security Desk',
    badge_no_acid: 'Non-destructive XRF assay',
    badge_cash_desk: 'Cash desk up to $250,000 on site',
    photo_caption_title: 'A real offer. In person.',
    photo_caption_sub: 'Class-I calibrated scale (0.01g) · Live market spot pricing',
    scale_pill_label: '14K Gold (585°) today',
    ledger_1_title: 'Up to 97.5% of market spot',
    ledger_1_desc: 'Transparent formula tied to official LBMA/COMEX fixing with zero hidden melt deductions.',
    ledger_2_title: '0.01g certified scale precision',
    ledger_2_desc: 'Ohaus dual-display digital scales calibrated for precision, fully visible to the client.',
    ledger_3_title: '15-second non-destructive assay',
    ledger_3_desc: 'Olympus Vanta X-ray fluorescence spectrometer verifies purity without filing marks or chemical acid.',
    ledger_4_title: 'Instant same-day payout',
    ledger_4_desc: 'Counted cash in a secure private counting room, instant wire transfer, or USDT on the spot.',
    calc_kicker: '01 / INTERACTIVE CASH CALCULATOR',
    calc_title: 'Calculate your instant cash or loan offer',
    calc_subtitle: 'Select karat purity, weight, or timepiece reference. Lock in your quote for 3 hours while you head to our private showroom.',
    tab_gold_title: 'Gold & Fine Jewelry',
    tab_gold_sub: '375° · 585° · 750° · 900° · 999.9°',
    tab_watches_title: 'Swiss Luxury Watches',
    tab_watches_sub: 'Rolex · Patek Philippe · AP · Cartier',
    tab_silver_title: 'Silver, Platinum & Bullion',
    tab_silver_sub: '875° · 925° · 999° · Pt 950°',
    lbl_select_purity: '1. Select gold karat purity',
    lbl_item_category: '2. Asset category',
    lbl_item_category_hint: 'Determines payout tier',
    cat_jewelry: 'Fine jewelry, chains, rings',
    cat_rate_base: 'Base rate',
    cat_scrap: 'Scrap gold / broken pieces',
    cat_rate_melt: 'Melt value',
    cat_bullion: 'Bullion bars & investment coins',
    cat_branded: 'Signed jewelry (Cartier, VCA)',
    lbl_weight: '3. Total weight (in grams)',
    lbl_tier_hint: 'Lots over 30g qualify for volume premium (+2%)',
    unit_grams: 'grams (g)',
    preset_ring: '5.5 g (Ring)',
    preset_chain: '24.5 g (Chain)',
    preset_bar: '100 g (Bar)',
    lbl_watch_model: '1. Select manufacture & reference',
    lbl_watch_index_hint: 'Live Chrono24 dealer index',
    lbl_watch_set: '2. Box & Papers completeness',
    watch_set_full: 'Full Set (Box + Warranty card)',
    watch_set_papers: 'Watch + Papers (No box)',
    watch_set_box: 'Watch + Box (No papers)',
    watch_set_only: 'Watch only',
    lbl_watch_cond: '3. Condition grade',
    watch_cond_unworn: 'Unworn / Brand new',
    watch_cond_excellent: 'Excellent (Unpolished)',
    watch_cond_good: 'Normal signs of wear',
    watch_cond_service: 'Mechanical service required',
    lbl_silver_metal: '1. Select metal & purity',
    silver_925: 'Silver 925° (Sterling / Jewelry)',
    silver_999: 'Silver 999° (Bars & coins)',
    silver_875: 'Silver 875° (Vintage & flatware)',
    plat_950: 'Platinum 950° (Fine jewelry)',
    lbl_silver_weight: '2. Lot weight (in grams)',
    preset_set: '250 g (Set)',
    preset_kilo: '1,000 g (1 kg)',
    receipt_header: 'OFFER SPECIFICATION',
    receipt_live: 'Official live spot rate',
    rec_lbl_1: 'Asset & Karat',
    rec_lbl_2: 'Appraisal Tier',
    rec_lbl_3: 'Pure Fine Metal Content',
    rec_lbl_4: 'Net Rate per 1g',
    rec_lbl_5: 'Melt & refining deductions',
    rec_no_deductions: '0% (No deductions)',
    payout_label: 'ESTIMATED CASH OFFER TODAY',
    payout_method: 'Immediate cash, wire transfer, or USDT',
    loan_alt_title: 'Prefer not to sell permanently?',
    loan_alt_sub: 'Available as an insured collateral loan (0.28% daily, no credit check)',
    btn_lock_rate: 'Lock this payout rate for 3 hours',
    btn_send_calc: 'Send estimate to my WhatsApp',
    receipt_footnote: '* Locking your quote reserves an official rate code: even if spot dips while traveling to the office, you receive the locked amount.',
    rates_kicker: '02 / LIVE BUYING BOARD',
    rates_title: 'Today’s Gold Buying Prices per Gram',
    rates_subtitle: 'Transparent counter rates tied directly to spot fixing. Click any purity row to load it into the calculator.',
    th_purity: 'Purity / Karat',
    th_examples: 'Typical Items Accepted',
    th_std: 'Standard (< 30g)',
    th_vip: 'High Volume (30g+)',
    th_bullion: 'Brand / Bullion Tier',
    th_action: 'Action',
    th_calc_btn: 'Calculate →',
    dirs_kicker: '03 / VAULT SPECIALIZATION',
    dirs_title: 'Four core luxury asset desks',
    dirs_subtitle: 'We evaluate not only pure metal weight, but horological liquidity, certified diamonds, and collector value.',
    card_1_title: 'Jewelry gold, scrap, coins & bullion',
    card_1_desc: 'We purchase 10K, 14K, 18K and 24K jewelry, broken chains, dental scrap, certified investment bullion bars (PAMP, Valcambi, Perth), and gold coins (American Eagle, Krugerrand, Maple Leaf).',
    spec_1_k1: 'Testing protocol',
    spec_1_v1: 'Olympus Vanta XRF spectrometer (no scratch)',
    spec_1_k2: 'Bars without assay cert',
    spec_1_v2: 'Purchased at 999.9° rate without penalty',
    spec_1_k3: 'Set gemstones',
    spec_1_v3: 'Appraised separately or safely unmounted',
    card_2_title: 'Swiss luxury mechanical timepieces',
    card_2_desc: 'We buy Rolex, Patek Philippe, Audemars Piguet, Vacheron Constantin, Cartier, and Omega. Verification performed by our master watchmaker preserving case factory water resistance.',
    spec_2_k1: 'Market benchmark',
    spec_2_v1: 'Live Chrono24 & private dealer exchange data',
    spec_2_k2: 'Without box & papers',
    spec_2_v2: 'Accepted upon verification in global lost databases',
    spec_2_k3: 'Payout currency',
    spec_2_v3: 'USD · EUR · USDT on the same visit',
    card_3_title: 'GIA diamonds from 0.30 ct & maison jewelry',
    card_3_desc: 'Unlike generic scrap shops, we never liquidate Cartier, Van Cleef & Arpels, Bvlgari, or Graff as scrap gold. Certified and loose diamonds evaluated according to the Rapaport list.',
    spec_3_k1: 'Gemological tools',
    spec_3_v1: 'Yehuda Sherlock Holmes / Presidium testers',
    spec_3_k2: 'Maison premium',
    spec_3_v2: 'Up to +45% over pure metal value',
    spec_3_k3: 'Uncertified stones',
    spec_3_v3: 'Complimentary analysis in front of client',
    card_4_title: 'Liquidity via insured collateral loans',
    card_4_desc: 'If you need short-term liquidity without parting with your valuables: 15-minute collateral loans. Items are sealed before you and kept in an insured high-security bank vault.',
    spec_4_k1: 'Credit bureau check',
    spec_4_v1: 'Zero credit checks, 100% confidential',
    spec_4_k2: 'Vault insurance',
    spec_4_v2: '100% appraised value covered by Lloyd’s policy',
    spec_4_k3: 'Early redemption',
    spec_4_v3: 'Any day without penalties, pay only for days used',
    proto_kicker: '04 / APPRAISAL PROTOCOL',
    proto_title: 'How your visit works and why we pay more',
    proto_subtitle: 'The entire process takes 10–15 minutes inside a private, closed VIP consultation room with dedicated security.',
    step_1_title: 'Walk in or lock your rate online',
    step_1_text: 'Arrive at your convenience with government-issued ID. Private security greets you and escorts you to a private viewing suite.',
    step_2_title: 'Non-destructive XRF assay & certified weighing',
    step_2_text: 'Right before your eyes, our assay specialist tests the metal using an Olympus Vanta spectrometer. No acid, no filing. Scale readout faces you.',
    step_3_title: 'Transparent written offer on spot price',
    step_3_text: 'You receive a printed specification sheet showing exact weight and price per gram. If you decline, you keep your items. The appraisal is 100% free.',
    step_4_title: 'Instant same-day cashier payout',
    step_4_text: 'Upon acceptance, official paperwork is issued. Cash is counted on bank-grade counters in front of you, or sent via instant wire.',
    comp_title: 'Our private desk vs. conventional pawnshops',
    comp_sub: 'Side-by-side comparison for a 14K (585) 35-gram gold curb chain',
    comp_t1: '01 / PURITY TESTING METHOD',
    comp_bad_1_t: 'Conventional pawnshop:',
    comp_bad_1_d: 'deep file cuts with nitric acid scratch test (permanently damages fine jewelry).',
    comp_good_1_t: 'Our private desk:',
    comp_good_1_d: 'XRF spectrometry in 15 seconds: 0% physical damage to your item.',
    comp_t2: '02 / HIDDEN SCALE DEDUCTIONS',
    comp_bad_2_t: 'Conventional pawnshop:',
    comp_bad_2_d: 'deducts 5%–8% for «dirt, solder, and steel clasp springs».',
    comp_good_2_t: 'Our private desk:',
    comp_good_2_d: '0% melt deductions. We pay for every 0.01g of verified fine weight.',
    comp_t3: '03 / VALUING BRAND & STONES',
    comp_bad_3_t: 'Conventional pawnshop:',
    comp_bad_3_d: 'signed designer rings and diamonds are bought at scrap weight or removed.',
    comp_good_3_t: 'Our private desk:',
    comp_good_3_d: 'gemologist pays premium for diamond clarity and signed maison value.',
    comp_t4: '04 / SECURITY & CASH RESERVES',
    comp_bad_4_t: 'Conventional pawnshop:',
    comp_bad_4_d: 'window counter exposed to public street; low cash liquidity.',
    comp_good_4_t: 'Our private desk:',
    comp_good_4_d: 'private consultation room, valet parking, and cash reserves up to $250k.',
    contact_kicker: '05 / REMOTE PHOTO ESTIMATE & OFFICE',
    contact_title: 'Get an accurate estimate before visiting',
    contact_subtitle: 'Send photos of hallmarks, scales, or your watch. An assay specialist will review and respond with a formal offer in 5 minutes.',
    form_title: '5-minute photo evaluation desk',
    lbl_your_name: 'Your name',
    lbl_your_phone: 'Phone number (WhatsApp / Mobile)',
    lbl_item_desc: 'Item description, karat, or timepiece reference',
    lbl_attach_photo: 'Attach photos of items or hallmarks (optional)',
    upload_placeholder: '+ Attach photos (JPG, PNG, HEIC) or drag here',
    upload_security: 'Confidential data encrypted end-to-end',
    btn_submit_form: 'Request cash offer & lock rate',
    office_card_title: 'Private showroom in the financial district',
    office_card_sub: 'Total discretion: unbranded entrance in a premier commercial tower, private security, and bulletproof viewing rooms.',
    lbl_office_addr: 'OFFICE ADDRESS',
    lbl_office_hours: 'HOURS OF OPERATION',
    lbl_office_phone: 'DIRECT ASSAY DESK LINE',
    contact_response_time: 'Average WhatsApp reply time: 2–3 minutes',
    footer_legal: 'AU 999.9 · PRIVATE ASSAY & BUYING DESK',
    footer_disclaimer: 'All estimates are based on live international bullion and watch exchanges (LBMA / COMEX). Transactions require official government-issued ID.',
    footer_copy: '© 2026. Private Bullion & Timepiece Vault. All rights reserved.',
    modal_kicker: '3-HOUR RATE LOCK',
    modal_title: 'Lock in your cash offer',
    modal_desc: 'Official offer breakdown and parking pass will be delivered directly to your WhatsApp.',
    modal_badge: '3-hour lock',
    btn_get_code: 'Receive rate lock code →'
  },
  ru: {
    page_title: 'Частный кабинет оценки · Золото, Серебро, Швейцарские часы',
    spot_label: 'ФИКСИНГ LBMA / COMEX В РЕАЛЬНОМ ВРЕМЕНИ:',
    spot_au_name: 'AU 999.9 (Золото)',
    spot_ag_name: 'AG 999 (Серебро)',
    spot_pt_name: 'PT 950 (Платина)',
    spot_oz_name: '1 Тройская унция (31.1035 г)',
    spot_updated_text: 'Котировки обновлены: текущий биржевой фиксинг ($ USD)',
    brand_title: 'ЧАСТНЫЙ КАБИНЕТ ОЦЕНКИ',
    brand_subtitle: 'ЗОЛОТО · СЕРЕБРО · ЧАСЫ · ЗАЛОГ',
    header_cta: 'Рассчитать выплату',
    nav_calc: 'Калькулятор оценки',
    nav_gold: 'Прайс-лист за грамм',
    nav_watches: 'Швейцарские часы',
    nav_silver: 'Серебро и монеты',
    nav_loans: 'Займы под залог',
    nav_protocol: 'Как проходит экспертиза',
    nav_contact: 'Оценка по фото и контакты',
    hero_eyebrow: 'Downtown Miami · Оценка в вашем присутствии · Расчет за 15 минут',
    hero_title: 'Выкуп золота, серебра и часов по курсу биржи.',
    hero_lead: 'Принесите изделия на бесплатную неразрушающую экспертизу и получите точное предложение в день визита. Проверяем пробу спектрометром без запилов и кислоты, взвешиваем при вас и выплачиваем всю сумму сразу в долларах США.',
    hero_btn_primary: 'Рассчитать выплату ($)',
    hero_btn_whatsapp: 'Отправить фото в WhatsApp / TG',
    trust_1: 'Без предварительной записи',
    trust_2: 'Бесплатная экспертиза',
    trust_3: 'Без обязательства продавать',
    hero_address: '174 E Flagler St, Miami · Пн–Сб, 9:00–20:00 · Отдельная переговорная',
    badge_no_acid: 'Без запилов и кислоты',
    badge_cash_desk: 'Касса до $250,000 в день',
    photo_caption_title: 'Реальная оценка. Лично при вас.',
    photo_caption_sub: 'Поверенные весы I класса (0.01 г) · Привязка к живому фиксингу',
    scale_pill_label: 'Золото 585° (14K) сегодня',
    ledger_1_title: 'до 97.5% от биржевого курса',
    ledger_1_desc: 'Прозрачная формула расчета от фиксинга LBMA/COMEX без скрытых удержаний «на угар» и «за грязь».',
    ledger_2_title: '0.01 г точность взвешивания',
    ledger_2_desc: 'Лабораторные весы Ohaus с дублирующим дисплеем на стороне гостя и действующей поверкой.',
    ledger_3_title: '15 секунд спектральный анализ',
    ledger_3_desc: 'Определяем точный состав сплава рентгенофлуоресцентным методом без царапин и реактивов.',
    ledger_4_title: '10–15 мин выплата на месте',
    ledger_4_desc: 'Наличные в USD в закрытой кассовой комнате с детектором купюр, мгновенный банковский перевод Wire или USDT.',
    calc_kicker: '01 / ОНЛАЙН-КАЛЬКУЛЯТОР ВЫПЛАТЫ',
    calc_title: 'Предварительный расчет по биржевому курсу ($)',
    calc_subtitle: 'Выберите тип актива, пробу или модель часов. Калькулятор считает реальную выплату на руки в USD и позволяет зафиксировать котировку на 3 часа.',
    tab_gold_title: 'Золото и украшения',
    tab_gold_sub: '375° · 585° · 750° · 900° · 999.9°',
    tab_watches_title: 'Швейцарские часы',
    tab_watches_sub: 'Rolex · Patek Philippe · AP · Cartier',
    tab_silver_title: 'Серебро, платина и монеты',
    tab_silver_sub: '875° · 925° · 999° · Pt 950°',
    lbl_select_purity: '1. Выберите пробу золота (Karat)',
    lbl_item_category: '2. Категория и вид изделий',
    lbl_item_category_hint: 'Влияет на коэффициент выкупа',
    cat_jewelry: 'Украшения, цепи, кольца',
    cat_rate_base: 'Базовый тариф',
    cat_scrap: 'Лом / порванные изделия',
    cat_rate_melt: 'По чистому металлу',
    cat_bullion: 'Слитки и инвест. монеты',
    cat_branded: 'Брендовые украшения',
    lbl_weight: '3. Общий вес изделий (в граммах)',
    lbl_tier_hint: 'От 30 г действует повышенный тариф (+2%)',
    unit_grams: 'грамм (г)',
    preset_ring: '5.5 г (Кольцо)',
    preset_chain: '24.5 г (Цепь)',
    preset_bar: '100 г (Слиток)',
    lbl_watch_model: '1. Выберите мануфактуру и референс',
    lbl_watch_index_hint: 'Данные дилерских торгов Chrono24',
    lbl_watch_set: '2. Комплектность (Box & Papers)',
    watch_set_full: 'Полный комплект (Full Set)',
    watch_set_papers: 'Часы + документы (без коробки)',
    watch_set_box: 'Часы + коробка (без карты)',
    watch_set_only: 'Только часы (Watch only)',
    lbl_watch_cond: '3. Техническое состояние',
    watch_cond_unworn: 'Новые / Неношеные (Unworn)',
    watch_cond_excellent: 'Отличное (без полировки)',
    watch_cond_good: 'Следы естественной носки',
    watch_cond_service: 'Требуется репассаж механизма',
    lbl_silver_metal: '1. Выберите металл и пробу',
    silver_925: 'Серебро 925° (Sterling / Украшения)',
    silver_999: 'Серебро 999° (Слитки и монеты)',
    silver_875: 'Серебро 875° / 84 проба',
    plat_950: 'Платина 950° (Platinum)',
    lbl_silver_weight: '2. Вес партии (в граммах)',
    preset_set: '250 г (Набор)',
    preset_kilo: '1 000 г (1 кг)',
    receipt_header: 'СПЕЦИФИКАЦИЯ РАСЧЕТА ($ USD)',
    receipt_live: 'Прямой курс биржи',
    rec_lbl_1: 'Актив и проба',
    rec_lbl_2: 'Категория оценки',
    rec_lbl_3: 'Чистый металл в расчете',
    rec_lbl_4: 'Ставка выкупа за 1 г',
    rec_lbl_5: 'Удержания на грязь / угар',
    rec_no_deductions: '0% (Без вычетов)',
    payout_label: 'СУММА ВЫПЛАТЫ НА РУКИ ($ USD)',
    payout_method: 'Наличными в кассе или переводом за 10 мин',
    loan_alt_title: 'Не хотите продавать изделие навсегда?',
    loan_alt_sub: 'Доступен займ под залог в сейфовом хранилище (0.28% в день)',
    btn_lock_rate: 'Зафиксировать этот курс на 3 часа',
    btn_send_calc: 'Отправить расчет себе в WhatsApp / TG',
    receipt_footnote: '* При фиксации котировки за вами закрепляется номер бронирования: даже если биржевой курс снизится пока вы едете в офис, мы выплатим зафиксированную сумму.',
    rates_kicker: '02 / КОТИРОВКИ КАБИНЕТА НА СЕГОДНЯ',
    rates_title: 'Прайс-лист выкупа золота за 1 грамм ($ USD)',
    rates_subtitle: 'Реальные цены скупки без звездочек. Нажмите на любую пробу, чтобы автоматически подставить ее в калькулятор.',
    th_purity: 'Проба / Карат',
    th_examples: 'Какие изделия относятся',
    th_std: 'Стандарт (до 30 г)',
    th_vip: 'Крупный лот (от 30 г)',
    th_bullion: 'В изделиях / слитках',
    th_action: 'Действие',
    th_calc_btn: 'В калькулятор →',
    dirs_kicker: '03 / СПЕЦИАЛИЗАЦИЯ КАБИНЕТА',
    dirs_title: 'Четыре направления работы с активами',
    dirs_subtitle: 'Оцениваем не только вес чистого металла, но и часовую ликвидность, сертифицированные бриллианты и коллекционную ценность.',
    card_1_title: 'Ювелирное золото, лом, монеты и слитки',
    card_1_desc: 'Принимаем украшения 10K, 14K, 18K и 24K, порванные цепи, непарные серьги, стоматологическое золото, а также мерные слитки от 1 г до 1 кг и золотые монеты (American Eagle, Krugerrand, Philharmonic).',
    spec_1_k1: 'Метод проверки',
    spec_1_v1: 'Спектрометр Olympus Vanta (без запилов)',
    spec_1_k2: 'Слитки без сертификата',
    spec_1_v2: 'Принимаем по ставке 999.9° без штрафа',
    spec_1_k3: 'Драгоценные камни в оправе',
    spec_1_v3: 'Оцениваем отдельно или аккуратно возвращаем',
    card_2_title: 'Швейцарские часы класса люкс',
    card_2_desc: 'Выкупаем часы Rolex, Patek Philippe, Audemars Piguet, Vacheron Constantin, Breguet, Cartier и Omega. Проверка подлинности проводится часовым мастером на месте с сохранением заводской герметичности корпуса.',
    spec_2_k1: 'Ориентир оценки',
    spec_2_v1: 'Реальные сделки Chrono24 и дилерских бирж',
    spec_2_k2: 'Без коробки и документов',
    spec_2_v2: 'Принимаем после проверки по базам',
    spec_2_k3: 'Валюта расчета',
    spec_2_v3: 'USD · EUR · USDT (в день визита)',
    card_3_title: 'Бриллианты от 0.30 ct и украшения Домов',
    card_3_desc: 'В отличие от обычных скупок, мы не оцениваем кольца Cartier, Van Cleef & Arpels, Bvlgari, Graff и Tiffany & Co. по цене золотого лома. Крупные бриллианты с сертификатами GIA и без них оцениваются геммологом по прайс-листу Rapaport.',
    spec_3_k1: 'Оборудование геммолога',
    spec_3_v1: 'Yehuda Sherlock Holmes / Presidium',
    spec_3_k2: 'Премия за ювелирный Дом',
    spec_3_v2: 'до +45% к стоимости металла',
    spec_3_k3: 'Камни без сертификата',
    spec_3_v3: 'Бесплатная диагностика в присутствии гостя',
    card_4_title: 'Оборотные деньги под залог без продажи',
    card_4_desc: 'Если актив дорог как память или вы ждете дальнейшего роста золота — оформите краткосрочный займ за 15 минут. Изделие пломбируется в вашем присутствии и хранится в сертифицированном банковском сейфовом хранилище.',
    spec_4_k1: 'Кредитная история',
    spec_4_v1: 'Не проверяется и никуда не передается',
    spec_4_k2: 'Страхование хранения',
    spec_4_v2: '100% оценочной стоимости в полисе',
    spec_4_k3: 'Досрочный выкуп',
    spec_4_v3: 'В любой день — оплата только за фактические дни',
    proto_kicker: '04 / ПРОТОКОЛ СДЕЛКИ',
    proto_title: 'Как проходит визит и почему у нас платят больше',
    proto_subtitle: 'Весь процесс занимает 10–15 минут в отдельной закрытой переговорной комнате без очереди и посторонних глаз.',
    step_1_title: 'Визит без записи или бронь курса онлайн',
    step_1_text: 'Вы приезжаете в удобное время с документом. Гостей встречает охрана и провожает в индивидуальный кабинет оценки.',
    step_2_title: 'Неразрушающий XRF-анализ и взвешивание',
    step_2_text: 'На ваших глазах эксперт проверяет изделие на спектрометре Olympus Vanta. Мы не делаем надпилов надфилем и не капаем кислоту. Табло весов повернуто к вам.',
    step_3_title: 'Открытая смета по биржевому фиксингу',
    step_3_text: 'Вы получаете печатный лист оценки с указанием точного веса и цены каждого грамма в USD. Если предложение вам не подходит — вы просто забираете вещи, экспертиза бесплатна.',
    step_4_title: 'Мгновенная выплата в кассе',
    step_4_text: 'При согласии оформляется официальный договор. Наличные USD проверяются на банковском сортировщике в вашем присутствии либо отправляются на ваш счет за 2 минуты.',
    comp_title: 'Чем наш кабинет отличается от уличных ломбардов',
    comp_sub: 'Наглядная разница на примере золотой цепи 14K (585) весом 35 грамм',
    comp_t1: '01 / ПРОВЕРКА ПРОБЫ МЕТАЛЛА',
    comp_bad_1_t: 'Обычная скупка:',
    comp_bad_1_d: 'глубокий запил надфилем на видном месте и проба азотной кислотой (портит украшение).',
    comp_good_1_t: 'Наш кабинет:',
    comp_good_1_d: 'рентгенофлуоресцентный спектрометр за 15 секунд — 0% следов на изделии.',
    comp_t2: '02 / СКРЫТЫЕ ВЫЧЕТЫ ИЗ ВЕСА',
    comp_bad_2_t: 'Обычная скупка:',
    comp_bad_2_d: 'вычитают 5–8% «на грязь, припой и стальную пружинку в замке».',
    comp_good_2_t: 'Наш кабинет:',
    comp_good_2_d: '0% вычетов на угар и грязь. Оплачиваем каждый 0.01 г чистого веса по табло весов.',
    comp_t3: '03 / ОЦЕНКА КАМНЕЙ И БРЕНДА',
    comp_bad_3_t: 'Обычная скупка:',
    comp_bad_3_d: 'брендовые кольца и бриллианты считают как обычный лом либо выкусывают камни.',
    comp_good_3_t: 'Наш кабинет:',
    comp_good_3_d: 'геммолог доплачивает за характеристики бриллиантов и сохранность брендовых изделий.',
    comp_t4: '04 / БЕЗОПАСНОСТЬ И ЛИМИТЫ КАССЫ',
    comp_bad_4_t: 'Обычная скупка:',
    comp_bad_4_d: 'тесное окно с решеткой у проходной улицы, лимит кассы до $3,000.',
    comp_good_4_t: 'Наш кабинет:',
    comp_good_4_d: 'закрытая переговорная, охраняемый паркинг и резерв кассы до $250,000 сразу.',
    contact_kicker: '05 / ДИСТАНЦИОННАЯ ОЦЕНКА И ВИЗИТ',
    contact_title: 'Узнайте точную сумму до выезда в офис',
    contact_subtitle: 'Пришлите фото клейма, весов или часов — дежурный эксперт рассчитает сумму выплаты за 5 минут и забронирует курс.',
    form_title: 'Экспресс-оценка по фото за 5 минут',
    lbl_your_name: 'Как к вам обращаться',
    lbl_your_phone: 'Телефон (WhatsApp / Telegram)',
    lbl_item_desc: 'Описание изделия, проба или референс часов',
    lbl_attach_photo: 'Фотографии изделия или клейма (необязательно)',
    upload_placeholder: '+ Прикрепить фото (JPG, HEIC, PNG) или перетащите сюда',
    upload_security: 'Данные защищены и удаляются сразу после оценки',
    btn_submit_form: 'Получить расчет и зафиксировать курс',
    office_card_title: 'Приватный офис в Downtown Miami',
    office_card_sub: 'Полная конфиденциальность визита, отдельный вход через бизнес-центр и собственная охрана.',
    lbl_office_addr: 'АДРЕС КАБИНЕТА',
    lbl_office_hours: 'РЕЖИМ РАБОТЫ',
    lbl_office_phone: 'ПРЯМАЯ ЛИНИЯ ОЦЕНЩИКА',
    contact_response_time: 'Отвечаем в WhatsApp за 2–3 минуты',
    footer_legal: 'AU 999.9 · PRIVATE ASSAY & BUYING DESK',
    footer_disclaimer: 'Все расчеты на сайте носят информационный характер и привязаны к текущим биржевым котировкам драгоценных металлов ($ USD). Для совершения сделки необходим документ, удостоверяющий личность.',
    footer_copy: '© 2026. Private Bullion & Timepiece Vault. Все права защищены.',
    modal_kicker: 'ФИКСАЦИЯ КОТИРОВКИ НА 3 ЧАСА',
    modal_title: 'Закрепить расчет за вашим номером',
    modal_desc: 'Параметры вашего расчета в USD будут отправлены вам в WhatsApp вместе с пропуском на парковку.',
    modal_badge: 'Бронь 3 часа',
    btn_get_code: 'Получить код бронирования курса →'
  }
};

// ==========================================
// 2. CURRENCY FORMATTING (STRICTLY USD)
// ==========================================
function formatMoney(amountUsd) {
  if (amountUsd >= 100) {
    return '$' + Math.round(amountUsd).toLocaleString('en-US');
  }
  return '$' + amountUsd.toFixed(2);
}

function getUnitSuffix() {
  if (STATE.lang === 'ru') return ' / г';
  return ' / g';
}

// ==========================================
// 3. UI UPDATE & RENDER
// ==========================================
function updateUI() {
  const dict = I18N[STATE.lang] || I18N.es;
  document.documentElement.lang = STATE.lang;

  // Title tag
  document.title = dict.page_title;

  // Replace text content for data-i18n
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Ticker prices in USD
  document.getElementById('ticker-au').textContent = formatMoney(STATE.spotAuUsdPerGram) + getUnitSuffix();
  document.getElementById('ticker-ag').textContent = formatMoney(STATE.spotAgUsdPerGram) + getUnitSuffix();
  document.getElementById('ticker-pt').textContent = formatMoney(STATE.spotPtUsdPerGram) + getUnitSuffix();

  // 14K hero pill in USD
  const payoutFactor = (100 - STATE.dealerMargin) / 100;
  const rate14k = STATE.spotAuUsdPerGram * 0.585 * payoutFactor;
  document.getElementById('hero-pill-585').textContent = formatMoney(rate14k) + getUnitSuffix();

  // Address and contact details (Miami)
  const contactAddrEl = document.getElementById('contact-address-val');
  const contactParkingEl = document.getElementById('contact-parking-val');
  const contactHoursEl = document.getElementById('contact-hours-val');
  const contactSunEl = document.getElementById('contact-sun-val');
  const contactPhoneEl = document.getElementById('contact-phone-val');
  const heroAddressEl = document.getElementById('hero-address-line');
  const badgeCashEl = document.getElementById('badge-cash-desk-text');
  const leadNameEl = document.getElementById('lead-name');
  const leadDescEl = document.getElementById('lead-desc');

  heroAddressEl.textContent = STATE.lang === 'es'
    ? '174 E Flagler St, Miami · Lun–Sáb, 9:00–20:00 · Sala de Seguridad Privada'
    : (STATE.lang === 'en' ? '174 E Flagler St, Miami · Mon–Sat, 9AM–8PM · Private Security Desk' : '174 E Flagler St, Майами · Пн–Сб, 9:00–20:00 · Приватный офис');
  contactAddrEl.textContent = '174 E Flagler St, Downtown Miami, FL 33131';
  if (contactParkingEl) {
    contactParkingEl.textContent = STATE.lang === 'es'
      ? 'Estacionamiento privado con valet previo aviso de 15 minutos'
      : (STATE.lang === 'en' ? 'Complimentary private valet parking with 15-minute notice' : 'Бесплатный гостевой паркинг по звонку за 15 минут до визита');
  }
  contactHoursEl.textContent = STATE.lang === 'es'
    ? 'Lunes a Sábado: 9:00 AM – 8:00 PM'
    : (STATE.lang === 'en' ? 'Monday – Saturday: 9:00 AM – 8:00 PM' : 'Понедельник – Суббота: 9:00 – 20:00');
  if (contactSunEl) {
    contactSunEl.textContent = STATE.lang === 'es'
      ? 'Domingo: previa cita para operaciones superiores a $10,000'
      : (STATE.lang === 'en' ? 'Sunday: by private appointment for transactions over $10,000' : 'Воскресенье: по предварительной записи для сделок от $10,000');
  }
  contactPhoneEl.textContent = '+1 (305) 555-0194';
  if (badgeCashEl) badgeCashEl.textContent = STATE.lang === 'es'
    ? 'Fondo de caja hasta $250,000'
    : (STATE.lang === 'en' ? 'Cash desk up to $250,000 on site' : 'Касса до $250,000 в день');
  if (leadNameEl) {
    leadNameEl.placeholder = STATE.lang === 'es' ? 'Carlos' : (STATE.lang === 'en' ? 'Michael' : 'Александр');
  }
  if (leadDescEl) {
    leadDescEl.placeholder = STATE.lang === 'es'
      ? 'Ejemplo: Cadena de oro 14K de 24.5 g, lingote de 1 oz o reloj Rolex Submariner...'
      : (STATE.lang === 'en'
        ? 'Example: 14K gold chain 24.5g, 1 oz gold bar, or Rolex Submariner 126610LN...'
        : 'Например: золотая цепь 14K (585) 24.5 г, слиток 1 oz или часы Rolex Submariner...');
  }

  // Active classes on language switchers
  document.querySelectorAll('.lang-switch .switch-btn').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-lang') === STATE.lang);
  });

  renderRatesTable();
  recalculateOffer();
}

function renderRatesTable() {
  const tbody = document.getElementById('rates-table-body');
  if (!tbody) return;

  const baseRatio = (100 - STATE.dealerMargin) / 100;
  const vipRatio = Math.min(0.992, baseRatio + 0.02);
  const brandRatio = Math.min(1.12, baseRatio + 0.08);
  const unit = getUnitSuffix();
  const dict = I18N[STATE.lang] || I18N.es;

  tbody.innerHTML = PURITIES_TABLE.map((row) => {
    const stdUsd = STATE.spotAuUsdPerGram * row.purity * baseRatio;
    const vipUsd = STATE.spotAuUsdPerGram * row.purity * vipRatio;
    const brandUsd = STATE.spotAuUsdPerGram * row.purity * (row.purity >= 0.99 ? 0.99 : brandRatio);
    const examples = row.examples[STATE.lang] || row.examples.es;

    return `
      <tr>
        <td>
          <div class="purity-pill">
            <span>${row.code}</span>
            <span class="purity-karat">${row.karat}</span>
          </div>
        </td>
        <td style="color: var(--text-secondary); max-width: 320px;">${examples}</td>
        <td class="rate-price-std tabular">${formatMoney(stdUsd)}${unit}</td>
        <td class="rate-price-vip tabular">${formatMoney(vipUsd)}${unit}</td>
        <td class="mono" style="color: var(--text-secondary);">${formatMoney(brandUsd)}${unit}</td>
        <td>
          <button type="button" class="rate-action-link" data-jump-purity="${row.purity}">
            ${dict.th_calc_btn}
          </button>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('[data-jump-purity]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetPurity = parseFloat(btn.getAttribute('data-jump-purity'));
      switchCalcTab('gold');
      document.querySelectorAll('#gold-karat-grid .karat-btn').forEach((kb) => {
        const kp = parseFloat(kb.getAttribute('data-purity'));
        if (Math.abs(kp - targetPurity) < 0.01) {
          kb.click();
        }
      });
      document.getElementById('calculator-section').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function recalculateOffer() {
  const baseRatio = (100 - STATE.dealerMargin) / 100;
  const dict = I18N[STATE.lang] || I18N.es;

  const recVal1 = document.getElementById('rec-val-1');
  const recVal2 = document.getElementById('rec-val-2');
  const recVal3 = document.getElementById('rec-val-3');
  const recVal4 = document.getElementById('rec-val-4');
  const finalDisplay = document.getElementById('final-payout-display');
  const ratePctDisplay = document.getElementById('payout-rate-percent');
  const loanDisplay = document.getElementById('loan-payout-display');

  let finalUsd = 0;
  let loanUsd = 0;
  let modalSummaryLabel = '';

  if (STATE.calcTab === 'gold') {
    const weight = Math.max(0.1, parseFloat(STATE.goldWeight) || 0);
    const volumeBonus = weight >= 30 ? 0.02 : 0;
    const effectiveRatio = Math.min(0.992, (baseRatio + volumeBonus) * STATE.goldCategoryMult);
    const pureGoldGrams = weight * STATE.goldPurity;
    const ratePerGramUsd = STATE.spotAuUsdPerGram * STATE.goldPurity * effectiveRatio;

    finalUsd = weight * ratePerGramUsd;
    loanUsd = finalUsd * 0.88;

    recVal1.textContent = (STATE.lang === 'ru' ? 'Золото ' : (STATE.lang === 'en' ? 'Gold ' : 'Oro ')) + STATE.goldPurityLabel;

    let catName = dict.cat_jewelry;
    if (STATE.goldCategoryId === 'scrap') catName = dict.cat_scrap;
    if (STATE.goldCategoryId === 'bullion') catName = dict.cat_bullion;
    if (STATE.goldCategoryId === 'branded') catName = dict.cat_branded;
    recVal2.textContent = catName;

    recVal3.textContent = `${pureGoldGrams.toFixed(2)} g Au 999.9`;
    recVal4.textContent = `${formatMoney(ratePerGramUsd)}${getUnitSuffix()}`;

    const pctText = Math.min(115, effectiveRatio * 100).toFixed(1);
    ratePctDisplay.textContent = STATE.lang === 'ru'
      ? `${pctText}% от биржи`
      : (STATE.lang === 'en' ? `${pctText}% of spot` : `${pctText}% del precio spot`);

    const hintEl = document.getElementById('purity-hint');
    if (hintEl) {
      hintEl.textContent = STATE.lang === 'ru'
        ? `${Math.round(STATE.goldPurity * 1000)} проба = ${(STATE.goldPurity * 100).toFixed(1)}% чистого Au`
        : (STATE.lang === 'en'
          ? `Karat ${STATE.goldPurityLabel} = ${(STATE.goldPurity * 100).toFixed(1)}% pure Au`
          : `Pureza ${STATE.goldPurityLabel} = ${(STATE.goldPurity * 100).toFixed(1)}% Au puro`);
    }

    modalSummaryLabel = `${(STATE.lang === 'ru' ? 'Золото' : (STATE.lang === 'en' ? 'Gold' : 'Oro'))} ${STATE.goldPurityLabel} · ${weight} g`;
  } else if (STATE.calcTab === 'watches') {
    const dealerBuyRatio = (100 - STATE.dealerMargin * 1.5) / 100;
    finalUsd = STATE.watchBaseUsd * STATE.watchSetMult * STATE.watchCondMult * dealerBuyRatio;
    loanUsd = finalUsd * 0.85;

    recVal1.textContent = STATE.watchName.split('(')[0].trim();

    let setLabel = dict.watch_set_full;
    if (STATE.watchSetId === 'papers') setLabel = dict.watch_set_papers;
    if (STATE.watchSetId === 'box') setLabel = dict.watch_set_box;
    if (STATE.watchSetId === 'watch') setLabel = dict.watch_set_only;
    recVal2.textContent = setLabel;

    let condLabel = dict.watch_cond_excellent;
    if (STATE.watchCondId === 'unworn') condLabel = dict.watch_cond_unworn;
    if (STATE.watchCondId === 'good') condLabel = dict.watch_cond_good;
    if (STATE.watchCondId === 'service') condLabel = dict.watch_cond_service;
    recVal3.textContent = condLabel;

    recVal4.textContent = '$' + STATE.watchBaseUsd.toLocaleString('en-US');
    ratePctDisplay.textContent = STATE.lang === 'ru'
      ? 'Выплата в день визита'
      : (STATE.lang === 'en' ? 'Same-day payout' : 'Liquidación inmediata');

    modalSummaryLabel = STATE.watchName;
  } else if (STATE.calcTab === 'silver') {
    const sWeight = Math.max(1, parseFloat(STATE.silverWeight) || 0);
    let unitSpotUsd = STATE.spotAgUsdPerGram * 0.925;
    let label = dict.silver_925;
    if (STATE.silverMetal === 'ag999') {
      unitSpotUsd = STATE.spotAgUsdPerGram * 0.999;
      label = dict.silver_999;
    } else if (STATE.silverMetal === 'ag875') {
      unitSpotUsd = STATE.spotAgUsdPerGram * 0.875;
      label = dict.silver_875;
    } else if (STATE.silverMetal === 'pt950') {
      unitSpotUsd = STATE.spotPtUsdPerGram * 0.95;
      label = dict.plat_950;
    }

    const netRateUsd = unitSpotUsd * baseRatio;
    finalUsd = sWeight * netRateUsd;
    loanUsd = finalUsd * 0.85;

    recVal1.textContent = label;
    recVal2.textContent = `${sWeight} g`;
    recVal3.textContent = 'XRF Olympus Vanta';
    recVal4.textContent = `${formatMoney(netRateUsd)}${getUnitSuffix()}`;

    ratePctDisplay.textContent = `${(baseRatio * 100).toFixed(1)}% spot`;
    modalSummaryLabel = `${label} · ${sWeight} g`;
  }

  finalDisplay.textContent = formatMoney(finalUsd);
  loanDisplay.textContent = formatMoney(loanUsd);

  const modalItemLabel = document.getElementById('modal-item-label');
  const modalItemPayout = document.getElementById('modal-item-payout');
  if (modalItemLabel) modalItemLabel.textContent = modalSummaryLabel;
  if (modalItemPayout) modalItemPayout.textContent = formatMoney(finalUsd);
}

// ==========================================
// 4. EVENT BINDINGS
// ==========================================
function switchCalcTab(tabName) {
  STATE.calcTab = tabName;
  document.querySelectorAll('.calc-tab').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
  });
  document.getElementById('panel-gold').style.display = tabName === 'gold' ? 'block' : 'none';
  document.getElementById('panel-watches').style.display = tabName === 'watches' ? 'block' : 'none';
  document.getElementById('panel-silver').style.display = tabName === 'silver' ? 'block' : 'none';
  recalculateOffer();
}

document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  document.querySelectorAll('.calc-tab').forEach((tabBtn) => {
    tabBtn.addEventListener('click', () => {
      switchCalcTab(tabBtn.getAttribute('data-tab'));
    });
  });

  // Gold karats
  document.querySelectorAll('#gold-karat-grid .karat-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#gold-karat-grid .karat-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.goldPurity = parseFloat(btn.getAttribute('data-purity'));
      STATE.goldPurityLabel = btn.getAttribute('data-label');
      recalculateOffer();
    });
  });

  // Gold category
  document.querySelectorAll('#gold-category-grid .cat-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#gold-category-grid .cat-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      STATE.goldCategoryMult = parseFloat(pill.getAttribute('data-mult'));
      STATE.goldCategoryId = pill.getAttribute('data-cat-id');
      recalculateOffer();
    });
  });

  // Gold weight
  const goldWeightInput = document.getElementById('gold-weight-input');
  const goldWeightSlider = document.getElementById('gold-weight-slider');

  goldWeightInput.addEventListener('input', () => {
    STATE.goldWeight = parseFloat(goldWeightInput.value) || 0;
    goldWeightSlider.value = Math.min(250, STATE.goldWeight);
    recalculateOffer();
  });

  goldWeightSlider.addEventListener('input', () => {
    STATE.goldWeight = parseFloat(goldWeightSlider.value);
    goldWeightInput.value = STATE.goldWeight;
    recalculateOffer();
  });

  document.querySelectorAll('.preset-chip[data-weight]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const w = parseFloat(chip.getAttribute('data-weight'));
      STATE.goldWeight = w;
      goldWeightInput.value = w;
      goldWeightSlider.value = Math.min(250, w);
      recalculateOffer();
    });
  });

  // Watches
  const watchSelect = document.getElementById('watch-model-select');
  watchSelect.addEventListener('change', () => {
    const opt = watchSelect.options[watchSelect.selectedIndex];
    STATE.watchBaseUsd = parseFloat(opt.getAttribute('data-usd'));
    STATE.watchName = opt.getAttribute('data-name');
    recalculateOffer();
  });

  document.querySelectorAll('#watch-set-grid .cat-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#watch-set-grid .cat-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      STATE.watchSetMult = parseFloat(pill.getAttribute('data-set-mult'));
      STATE.watchSetId = pill.getAttribute('data-set-id');
      recalculateOffer();
    });
  });

  document.querySelectorAll('#watch-cond-grid .cat-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#watch-cond-grid .cat-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      STATE.watchCondMult = parseFloat(pill.getAttribute('data-cond-mult'));
      STATE.watchCondId = pill.getAttribute('data-cond-id');
      recalculateOffer();
    });
  });

  // Silver
  document.querySelectorAll('#silver-metal-grid .cat-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#silver-metal-grid .cat-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      STATE.silverMetal = pill.getAttribute('data-metal');
      recalculateOffer();
    });
  });

  const silverInput = document.getElementById('silver-weight-input');
  const silverSlider = document.getElementById('silver-weight-slider');

  silverInput.addEventListener('input', () => {
    STATE.silverWeight = parseFloat(silverInput.value) || 0;
    silverSlider.value = Math.min(2000, STATE.silverWeight);
    recalculateOffer();
  });

  silverSlider.addEventListener('input', () => {
    STATE.silverWeight = parseFloat(silverSlider.value);
    silverInput.value = STATE.silverWeight;
    recalculateOffer();
  });

  document.querySelectorAll('.silver-preset').forEach((chip) => {
    chip.addEventListener('click', () => {
      const w = parseFloat(chip.getAttribute('data-sweight'));
      STATE.silverWeight = w;
      silverInput.value = w;
      silverSlider.value = Math.min(2000, w);
      recalculateOffer();
    });
  });

  // Language buttons
  document.getElementById('btn-lang-es').addEventListener('click', () => {
    STATE.lang = 'es';
    updateUI();
  });

  document.getElementById('btn-lang-en').addEventListener('click', () => {
    STATE.lang = 'en';
    updateUI();
  });

  document.getElementById('btn-lang-ru').addEventListener('click', () => {
    STATE.lang = 'ru';
    updateUI();
  });

  // Modal
  const modal = document.getElementById('offer-modal');
  const openModalBtns = [
    document.getElementById('lock-offer-btn'),
    document.getElementById('send-calc-whatsapp-btn'),
    document.getElementById('open-photo-modal-btn')
  ];
  openModalBtns.forEach((b) => {
    if (b) {
      b.addEventListener('click', () => {
        modal.classList.add('open');
      });
    }
  });

  document.getElementById('close-modal-btn').addEventListener('click', () => {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  document.getElementById('modal-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const code = 'AU-' + Math.floor(1000 + Math.random() * 9000);
    const btn = e.target.querySelector('button[type="submit"]');
    const dict = I18N[STATE.lang] || I18N.es;
    btn.textContent = STATE.lang === 'ru'
      ? `✓ Код #${code} отправлен`
      : (STATE.lang === 'en' ? `✓ Code #${code} sent` : `✓ Código #${code} enviado`);
    btn.style.background = '#46a76f';
    btn.style.color = '#ffffff';
    setTimeout(() => {
      modal.classList.remove('open');
      btn.textContent = dict.btn_get_code;
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  });

  // Lead Form & Upload Mock
  document.getElementById('mock-upload-zone').addEventListener('click', () => {
    const el = document.getElementById('upload-status-text');
    el.textContent = STATE.lang === 'ru'
      ? '✓ Фото прикреплено: hallmark_14k_gold.jpg (2.1 MB)'
      : (STATE.lang === 'en' ? '✓ Photo attached: hallmark_14k_gold.jpg (2.1 MB)' : '✓ Foto adjuntada: contraste_oro_14k.jpg (2.1 MB)');
  });

  document.getElementById('lead-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const code = 'AU-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('success-code-title').textContent = STATE.lang === 'ru'
      ? `✓ Котировка #${code} успешно зафиксирована на 3 часа`
      : (STATE.lang === 'en'
        ? `✓ Quote #${code} locked for 3 hours`
        : `✓ Cotización #${code} fijada con éxito por 3 horas`);
    document.getElementById('form-success-banner').style.display = 'block';
  });

  // Initial render (Spanish default)
  updateUI();
});
