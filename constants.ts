import type { PyramidLevelData } from './types';

export const PYRAMID_LEVELS: PyramidLevelData[] = [
  {
    id: 'AAA',
    label: 'AAA',
    description: 'A mais alta classificação. Representa entidades com capacidade financeira extremamente forte para honrar compromissos. O risco de inadimplência é considerado o mais baixo possível.',
    colorClass: 'bg-green-700 hover:bg-green-600',
    colorHex: '#15803d',
  },
  {
    id: 'AA',
    label: 'AA',
    description: 'Capacidade financeira muito forte. Entidades com um risco de crédito muito baixo, diferenciando-se da classificação AAA por uma margem de segurança marginalmente menor. Ainda assim, são consideradas de altíssima qualidade.',
    colorClass: 'bg-green-500 hover:bg-green-400',
    colorHex: '#22c55e',
  },
  {
    id: 'A',
    label: 'A',
    description: 'Forte capacidade financeira, mas com alguma suscetibilidade a condições económicas adversas. O risco de inadimplência permanece baixo, representando um investimento seguro e de alta qualidade.',
    colorClass: 'bg-green-300 hover:bg-green-200',
    colorHex: '#86efac',
  },
  {
    id: 'BBB',
    label: 'BBB',
    description: 'Capacidade financeira adequada. Representa o último degrau do "grau de investimento". No entanto, condições económicas adversas têm maior probabilidade de enfraquecer a sua capacidade de cumprir compromissos.',
    colorClass: 'bg-amber-500 hover:bg-amber-400',
    colorHex: '#f59e0b',
  },
  {
    id: 'BB',
    label: 'BB',
    description: 'Grau especulativo. Apresenta vulnerabilidade financeira no curto prazo, especialmente diante de condições económicas desfavoráveis. Enfrenta incertezas que podem afetar a sua capacidade de pagamento.',
    colorClass: 'bg-yellow-400 hover:bg-yellow-300',
    colorHex: '#facc15',
  },
  {
    id: 'B',
    label: 'B',
    description: 'Altamente especulativo. A capacidade de honrar compromissos financeiros é vulnerável e depende de condições de mercado favoráveis. Um risco de inadimplência significativo está presente.',
    colorClass: 'bg-yellow-300 hover:bg-yellow-200',
    colorHex: '#fde047',
  },
  {
    id: 'CCC+',
    label: 'CCC+',
    description: 'Risco substancial. A entidade encontra-se vulnerável e a sua capacidade de cumprir os compromissos depende inteiramente de condições económicas e de mercado favoráveis. A inadimplência é uma possibilidade real.',
    colorClass: 'bg-red-800 hover:bg-red-700',
    colorHex: '#991b1b',
  },
  {
    id: 'CCC',
    label: 'CCC',
    description: 'Risco extremamente alto. Atualmente vulnerável a inadimplência e dependente de condições favoráveis para cumprir os seus compromissos. A probabilidade de incumprimento é elevada.',
    colorClass: 'bg-red-700 hover:bg-red-600',
    colorHex: '#b91c1c',
  },
  {
    id: 'CC+',
    label: 'CC+',
    description: 'Nível de risco muito alto, com sérias dúvidas sobre a viabilidade. O incumprimento de alguma das suas obrigações financeiras é uma forte probabilidade.',
    colorClass: 'bg-red-600 hover:bg-red-500',
    colorHex: '#dc2626',
  },
  {
    id: 'CC',
    label: 'CC',
    description: 'Incumprimento altamente provável. A saúde financeira é extremamente frágil. A entidade já pode ter falhado alguns pagamentos ou está perto de o fazer.',
    colorClass: 'bg-red-500 hover:bg-red-400',
    colorHex: '#ef4444',
  },
  {
    id: 'C+',
    label: 'C+',
    description: 'Em processo de incumprimento ou perto dele. Esta classificação indica que a entidade está em processo de falência ou já cessou as suas operações, com pouca perspectiva de recuperação.',
    colorClass: 'bg-red-400 hover:bg-red-300',
    colorHex: '#f87171',
  },
  {
    id: 'C',
    label: 'C',
    description: 'Em incumprimento (default). A entidade já falhou em cumprir as suas obrigações financeiras. Esta é a classificação de risco mais baixa, indicando insolvência ou liquidação.',
    colorClass: 'bg-red-300 hover:bg-red-200',
    colorHex: '#fca5a5',
  }
];

export const FILTER_CATEGORIES = [
  { id: 'Tier 1 Premium', label: 'Tier 1 Premium' },
  { id: 'Tier 2', label: 'Tier 2' },
  { id: 'Especulativo', label: 'Especulativo' },
];

interface Manufacturer {
  name: string;
}

export const MANUFACTURER_BRANDS: Record<string, Manufacturer[]> = {
  'Tier 1 Premium': [
    { name: 'Jinko Solar' },
    { name: 'LONGi' },
    { name: 'Trina Solar' },
    { name: 'JA Solar' },
    { name: 'Canadian Solar'},
    { name: 'Risen Energy'},
  ],
  'Tier 2': [
    { name: 'First Solar' },
    { name: 'Qcells' },
    { name: 'Maxeon' },
    { name: 'REC Group' },
    { name: 'Meyer Burger' },
    { name: 'Silfab' },
  ],
  'Especulativo': [
    { name: 'Phono Solar' },
    { name: 'Seraphim' },
    { name: 'Suntech' },
    { name: 'Axitec' },
    { name: 'Talesun' },
    { name: 'ZNSHINE' },
  ],
};