import { getActiveMarketId, type MarketId } from "./market";

export type LegalSection = {
  heading: string;
  body: string;
};

export type Market = {
  id: MarketId;
  iso: "BR" | "PE" | "CO" | "EC" | "PY";
  lang: string;
  countryName: string;
  ticketsLabel: string;
  badge: string;
  title: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  boardingPass: string;
  dailyOffers: string;
  fromLabel: string;
  toLabel: string;
  toValue: string;
  classLabel: string;
  classValue: string;
  cta: string;
  ctaHint: string;
  infoTitle: string;
  infoBody: string;
  termsLinkLabel: string;
  privacyLinkLabel: string;
  termsTitle: string;
  termsIntro: string;
  termsSections: LegalSection[];
  privacyTitle: string;
  privacyIntro: string;
  privacySections: LegalSection[];
  destinations: { city: string; code: string }[];
};

function spanishLegal(
  countryName: string,
  tickets: string,
  privacyLaw: string,
  privacyRights: string,
): Pick<
  Market,
  | "boardingPass"
  | "dailyOffers"
  | "fromLabel"
  | "toLabel"
  | "toValue"
  | "classLabel"
  | "classValue"
  | "cta"
  | "ctaHint"
  | "infoTitle"
  | "termsLinkLabel"
  | "privacyLinkLabel"
  | "termsTitle"
  | "termsIntro"
  | "termsSections"
  | "privacyTitle"
  | "privacyIntro"
  | "privacySections"
> {
  return {
    boardingPass: "Tarjeta de embarque",
    dailyOffers: "Ofertas del día",
    fromLabel: "De",
    toLabel: "Hacia",
    toValue: "Mundo",
    classLabel: "Clase",
    classValue: "Promo",
    cta: "Ver ofertas ahora",
    ctaHint:
      "Serás dirigido a las ofertas disponibles en este momento. Aplican términos y condiciones.",
    infoTitle: "Información",
    termsLinkLabel: "Términos y condiciones",
    privacyLinkLabel: "Tratamiento de datos",
    termsTitle: "Términos y condiciones",
    termsIntro: `Estos términos regulan el uso de travel.co en ${countryName}. Al entrar al sitio o continuar a las ofertas, aceptas las condiciones siguientes.`,
    termsSections: [
      {
        heading: "1. El servicio",
        body: `travel.co muestra ofertas de ${tickets} y puede redirigirte a sitios de terceros para consultar o comprar. No emitimos pasajes de forma directa.`,
      },
      {
        heading: "2. Ofertas",
        body: "Precios, horarios y disponibilidad pueden cambiar sin previo aviso. Cada oferta sigue las reglas de la aerolínea o del operador responsable.",
      },
      {
        heading: "3. Responsabilidad",
        body: "El contrato de transporte, cambios, cancelaciones, equipaje y reembolsos corresponden a la aerolínea o agencia con la que contrates.",
      },
    ],
    privacyTitle: "Tratamiento de datos",
    privacyIntro: privacyLaw,
    privacySections: [
      {
        heading: "Datos utilizados",
        body: "Podemos tratar dirección IP, país de acceso, datos de navegación y registros técnicos para mostrar el sitio, aplicar la redirección geográfica y operar la página.",
      },
      {
        heading: "Finalidad",
        body: "Los datos se usan para prestar el servicio, dirigir ofertas, cumplir obligaciones legales y proteger la seguridad de la plataforma.",
      },
      {
        heading: "Derechos",
        body: privacyRights,
      },
    ],
  };
}

const brazil: Market = {
  id: "1",
  iso: "BR",
  lang: "pt-BR",
  countryName: "Brasil",
  ticketsLabel: "Passagens aéreas",
  badge: "Ofertas exclusivas",
  title: "As melhores ofertas de passagens aéreas do Brasil",
  lead: "A travel.co reúne promoções de voos nacionais e internacionais para você viajar agora. Clique abaixo e acesse as ofertas do momento.",
  metaTitle: "travel.co — Ofertas de passagens aéreas no Brasil",
  metaDescription:
    "Encontre as melhores ofertas de passagens aéreas no Brasil. Voos nacionais e internacionais com preços especiais.",
  boardingPass: "Cartão de embarque",
  dailyOffers: "Ofertas do dia",
  fromLabel: "De",
  toLabel: "Para",
  toValue: "Mundo",
  classLabel: "Classe",
  classValue: "Promo",
  cta: "Ver ofertas agora",
  ctaHint:
    "Você será encaminhado para as ofertas disponíveis neste momento. Aplicam-se termos e condições.",
  infoTitle: "Informações",
  infoBody:
    "As ofertas de passagens aéreas com origem ou destino no Brasil estão sujeitas a disponibilidade, datas, companhia aérea e condições de cada promoção. A travel.co exibe e encaminha a ofertas de terceiros; o contrato de transporte é celebrado com a operadora ou companhia aérea correspondente.",
  termsLinkLabel: "Termos e condições",
  privacyLinkLabel: "Tratamento de dados",
  termsTitle: "Termos e condições",
  termsIntro:
    "Estes termos regulam o uso do site travel.co no Brasil. Ao acessar a página ou seguir para as ofertas, você concorda com as condições abaixo.",
  termsSections: [
    {
      heading: "1. O serviço",
      body: "A travel.co apresenta ofertas de passagens aéreas e pode redirecionar você a sites de terceiros para concluir a consulta ou a compra. Não emitimos bilhetes diretamente.",
    },
    {
      heading: "2. Ofertas",
      body: "Preços, horários e disponibilidade podem mudar sem aviso. Cada oferta segue as regras da companhia aérea ou do operador responsável.",
    },
    {
      heading: "3. Responsabilidade",
      body: "O contrato de transporte, alterações, cancelamentos, bagagem e reembolsos são de responsabilidade da companhia aérea ou da agência com a qual você contratar.",
    },
  ],
  privacyTitle: "Tratamento de dados",
  privacyIntro:
    "O tratamento de dados pessoais no Brasil observa a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).",
  privacySections: [
    {
      heading: "Dados utilizados",
      body: "Podemos tratar endereço IP, país de acesso, dados de navegação e registros técnicos para exibir o site, aplicar redirecionamento geográfico e medir o funcionamento da página.",
    },
    {
      heading: "Finalidade",
      body: "Os dados são usados para operar o site, direcionar ofertas, cumprir obrigações legais e proteger a segurança da plataforma.",
    },
    {
      heading: "Direitos",
      body: "Você pode solicitar acesso, correção ou exclusão dos seus dados, nos termos da LGPD, pelo canal de contato da travel.co.",
    },
  ],
  destinations: [
    { city: "Rio de Janeiro", code: "GIG" },
    { city: "São Paulo", code: "GRU" },
    { city: "Salvador", code: "SSA" },
    { city: "Recife", code: "REC" },
    { city: "Fortaleza", code: "FOR" },
    { city: "Florianópolis", code: "FLN" },
  ],
};

const peruLegal = spanishLegal(
  "el Perú",
  "pasajes aéreos",
  "El tratamiento de datos personales en el Perú se rige por la Ley N.° 29733, Ley de Protección de Datos Personales, y su reglamento.",
  "Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición conforme a la Ley N.° 29733 a través del canal de contacto de travel.co.",
);

const colombiaLegal = spanishLegal(
  "Colombia",
  "tiquetes aéreos",
  "El tratamiento de datos personales en Colombia se rige por la Ley 1581 de 2012 y sus decretos reglamentarios.",
  "Puedes conocer, actualizar, rectificar y suprimir tus datos, y revocar la autorización, conforme a la Ley 1581 de 2012, a través del canal de contacto de travel.co.",
);

const ecuadorLegal = spanishLegal(
  "el Ecuador",
  "pasajes aéreos",
  "El tratamiento de datos personales en el Ecuador se rige por la Ley Orgánica de Protección de Datos Personales.",
  "Puedes ejercer tus derechos de acceso, rectificación, eliminación y oposición conforme a la normativa ecuatoriana a través del canal de contacto de travel.co.",
);

const paraguayLegal = spanishLegal(
  "el Paraguay",
  "pasajes aéreos",
  "El tratamiento de datos personales en el Paraguay se rige por la Ley N.° 6534/2020 de Protección de Datos Personales.",
  "Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición conforme a la Ley N.° 6534/2020 a través del canal de contacto de travel.co.",
);

const peru: Market = {
  id: "2",
  iso: "PE",
  lang: "es-PE",
  countryName: "Perú",
  ticketsLabel: "Pasajes aéreos",
  badge: "Ofertas exclusivas",
  title: "Las mejores ofertas de pasajes aéreos del Perú",
  lead: "travel.co reúne promociones de vuelos nacionales e internacionales para que viajes ahora. Pulsa el botón y accede a las ofertas del momento.",
  metaTitle: "travel.co — Ofertas de pasajes aéreos en Perú",
  metaDescription:
    "Encuentra las mejores ofertas de pasajes aéreos en Perú. Vuelos nacionales e internacionales con precios especiales.",
  ...peruLegal,
  infoBody:
    "Las ofertas de pasajes aéreos con origen o destino en el Perú están sujetas a disponibilidad, fechas, aerolínea y condiciones de cada promoción. travel.co muestra y deriva a ofertas de terceros; el contrato de transporte se celebra con el operador o aerolínea correspondiente.",
  destinations: [
    { city: "Lima", code: "LIM" },
    { city: "Cusco", code: "CUZ" },
    { city: "Arequipa", code: "AQP" },
    { city: "Iquitos", code: "IQT" },
    { city: "Piura", code: "PIU" },
    { city: "Juliaca", code: "JUL" },
  ],
};

const colombia: Market = {
  id: "3",
  iso: "CO",
  lang: "es-CO",
  countryName: "Colombia",
  ticketsLabel: "Tiquetes aéreos",
  badge: "Ofertas exclusivas",
  title: "Las mejores ofertas de tiquetes aéreos de Colombia",
  lead: "travel.co reúne promociones de vuelos nacionales e internacionales para que viajes ahora. Pulsa el botón y accede a las ofertas del momento.",
  metaTitle: "travel.co — Ofertas de tiquetes aéreos en Colombia",
  metaDescription:
    "Encuentra las mejores ofertas de tiquetes aéreos en Colombia. Vuelos nacionales e internacionales con precios especiales.",
  ...colombiaLegal,
  boardingPass: "Pase de abordar",
  infoBody:
    "Las ofertas de tiquetes aéreos con origen o destino en Colombia están sujetas a disponibilidad, fechas, aerolínea y condiciones de cada promoción. travel.co muestra y deriva a ofertas de terceros; el contrato de transporte se celebra con el operador o aerolínea correspondiente.",
  destinations: [
    { city: "Bogotá", code: "BOG" },
    { city: "Medellín", code: "MDE" },
    { city: "Cali", code: "CLO" },
    { city: "Cartagena", code: "CTG" },
    { city: "Barranquilla", code: "BAQ" },
    { city: "Santa Marta", code: "SMR" },
  ],
};

const ecuador: Market = {
  id: "4",
  iso: "EC",
  lang: "es-EC",
  countryName: "Ecuador",
  ticketsLabel: "Pasajes aéreos",
  badge: "Ofertas exclusivas",
  title: "Las mejores ofertas de pasajes aéreos del Ecuador",
  lead: "travel.co reúne promociones de vuelos nacionales e internacionales para que viajes ahora. Pulsa el botón y accede a las ofertas del momento.",
  metaTitle: "travel.co — Ofertas de pasajes aéreos en Ecuador",
  metaDescription:
    "Encuentra las mejores ofertas de pasajes aéreos en Ecuador. Vuelos nacionales e internacionales con precios especiales.",
  ...ecuadorLegal,
  infoBody:
    "Las ofertas de pasajes aéreos con origen o destino en el Ecuador están sujetas a disponibilidad, fechas, aerolínea y condiciones de cada promoción. travel.co muestra y deriva a ofertas de terceros; el contrato de transporte se celebra con el operador o aerolínea correspondiente.",
  destinations: [
    { city: "Quito", code: "UIO" },
    { city: "Guayaquil", code: "GYE" },
    { city: "Cuenca", code: "CUE" },
    { city: "Baltra", code: "GPS" },
    { city: "Manta", code: "MEC" },
    { city: "Loja", code: "LOH" },
  ],
};

const paraguay: Market = {
  id: "5",
  iso: "PY",
  lang: "es-PY",
  countryName: "Paraguay",
  ticketsLabel: "Pasajes aéreos",
  badge: "Ofertas exclusivas",
  title: "Las mejores ofertas de pasajes aéreos del Paraguay",
  lead: "travel.co reúne promociones de vuelos nacionales e internacionales para que viajes ahora. Pulsa el botón y accede a las ofertas del momento.",
  metaTitle: "travel.co — Ofertas de pasajes aéreos en Paraguay",
  metaDescription:
    "Encuentra las mejores ofertas de pasajes aéreos en Paraguay. Vuelos nacionales e internacionales con precios especiales.",
  ...paraguayLegal,
  infoBody:
    "Las ofertas de pasajes aéreos con origen o destino en el Paraguay están sujetas a disponibilidad, fechas, aerolínea y condiciones de cada promoción. travel.co muestra y deriva a ofertas de terceros; el contrato de transporte se celebra con el operador o aerolínea correspondiente.",
  destinations: [
    { city: "Asunción", code: "ASU" },
    { city: "C. del Este", code: "AGT" },
    { city: "Encarnación", code: "ENO" },
    { city: "Buenos Aires", code: "EZE" },
    { city: "São Paulo", code: "GRU" },
    { city: "Santiago", code: "SCL" },
  ],
};

const markets: Record<MarketId, Market> = {
  "1": brazil,
  "2": peru,
  "3": colombia,
  "4": ecuador,
  "5": paraguay,
};

export function getActiveMarket(): Market {
  return markets[getActiveMarketId()];
}
