/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
// @ts-ignore
import xlsxParser from 'xls-parser';

export const formatSheet = [
  'ID do Sistema', // 'id'
  'Seguimento', // 'branch_type'
  'Desativado', // 'inactive'
  // application
  'Montadora', // 'automaker'
  'Modelo', // 'model'
  'AnoMod.De', // 'year_start'
  'AnoMod.Até', // 'year_end'
  'Motor', // 'engine'
  'Complemento', // 'complement'
  'Quantidade De Uso', // 'quantity_used'
  'Ebalagem de Venda', // 'quantity_package'
  'Grupo', // table groups -> 'group_id'
  'SubGrupo', // table subgroups -> 'subgroup_id'
  'FotoSubGrupo', // link ???
  'Foto do Produto', // link ???
  'Video', // link ???
  'Descrição do Fornecedor', // ???
  'Nome do Produto', // 'name'
  'Sinônimos', // table synonyms -> 'group_id'
  'Medida (mm)', // 'measure'
  'Posição', // 'position'
  'Sistema', // 'system'
  'Côr', // 'color'
  'Material', // 'material'
  'Observações', // 'obs'
  // dimension
  'Tamanho', // não definido
  'Medida', // 'measure'
  'Altura (cm)', // 'height'
  'Largura (cm)', // 'width'
  'Comprimento (cm)', // 'lenth'
  'Peso (kg)', // 'weight'
  'Diâmetro Interno (mm)', // 'inner_diameter'
  'Diâmetro Externo (mm)', // 'external_diameter'
  'Espessura (mm)', // 'depth'
  'Fornecedor Nome Fantasia', // table users (is_provider) -> nick
  // description
  'Título', // não definido
  'Nome do Produto', // 'name'
  'Tipo', // não definido
  'Posição', // 'position'
  'Sistema', // 'system'
  'Côr', // 'color'
  'Material', // 'material'
  'Observações', // 'obs'
  'Combustível', // não definido
  'Chassi', // não definido
  'AnoMod.Fab', // não definido
  'AnoMod.model', // não definido
  'Qualidade da Marca', // 'quality '
  'Preço', // não definido
  // others
  'Seguimento', // 'branch_type'
  'Descrição do Fornecedor', // 'provider_description'
  'Espessura (mm)', // 'depth'
  'Fornecedor Nome Fantasia', // 'provider_name'
  'NCM Código Fiscal', // 'ncm'
  'SKU Código Fornecedor ', // 'sku'
  'EAM Código Barras', // 'eam'
  'OEM Código Original', // 'oem'
  'MPN Código Marca', // 'mpn'
  'Marca do Produto', // 'brand'
  'Qualidade da Marca', // 'quality '
  'Embalagem de Compra', // 'purchase_packaging'
  'Estoque do Fornecedor', // !!!!
  'Venda Ultimos 3 Meses', // !!!!
  'Média Venda', // !!!!
  'Embalagem de Compra', // 'purchase_packaging'
  'Local do Produto', // 'place'
  'Unidade', // 'unity'
  'Preço Custo', // 'cost_price'
  'Preço Venda', // 'sale_price'
  'Descrição Título do Produto', // 'description'
  'Tipo MLB', // 'type_mlb'
  'Variações MLB', // 'variations_mlb'
  'Atribuições MLB', // 'assignments_mlb'
  'ID da Categorias MLB', // 'category_id_mlb'
  'Desativado', // 'inactive'
  'Margem lucro',
  'mpn código da marca',
  'descrição título do produto 60 carateres c/fórmula'
];

export const authorizedExtensions = [
  'text/csv',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];

export const sheetToJson = async (file: unknown): Promise<unknown> =>
  xlsxParser.onFileSelection(file, {
    showNullProperties: false,
    hideEmptyRows: true,
  });
export const checkExtension = (file: { type: string }): boolean =>
  authorizedExtensions.includes(file.type);

export const checkFormat = (file: any): unknown => {
  let isValid = true;
  const sheets: Array<{ 0: string; 1: string[] }> = Object.entries(file);
  for (const sheet of sheets) {
    const firstline = sheet[1][0]; // sheet[0] is the name of sheet
    const keys = Object.keys(firstline);
    if (!keys.length) {
      isValid = false;
      break;
    }
    const missingKeys = [];
    const lowerCaseFields = formatSheet.map(t => t.trim().toLowerCase());
    for (const key of keys) {
      const parsedKey = key.trim().toLowerCase();
      if (!lowerCaseFields.includes(parsedKey)) {
        missingKeys.push(parsedKey);
        isValid = false;
      }
    }
  }
  return isValid;
};

const getSynonyms = (s: string | null) => {
  if (s?.includes('|') || s?.length) {
    if (!s?.includes('|')) return s;
    return s.split('|');
  }
  return [];
};

const verifyIfIsNullLine = (object: { [x: string]: any }) =>
  Object.values(object).every(x => x === null || x === '');

const getProductsData = (s: { [x: string]: any }) => {
  return {
    inactive: s.Desativado ?? false,
    // application
    automaker: s.Montadora ?? null,
    model: s.Modelo ?? null,
    year_start: s['AnoMod.De'] ?? null,
    year_end: s['AnoMod.Até'] ?? null,
    engine: s.Motor ?? null,
    complement: s.Complemento ?? null,
    quantity_used: s['Quantidade De Uso'] ?? null,
    quantity_package: s['Ebalagem de Venda'] ?? null,
    // dimension
    size: s.Tamanho ?? null, // não definido
    measure: s['Medida'] ?? null,
    height: s['Altura (cm)'] ?? null,
    width: s['Largura (cm)'] ?? null,
    lenth: s['Comprimento (cm)'] ?? null,
    weight: s['Peso (kg)'] ?? null,
    inner_diameter: s['Diâmetro Interno (mm)'] ?? null,
    external_diameter: s['Diâmetro Externo (mm)'] ?? null,
    // description
    title: s['Título'] ?? null, // não definido
    name: s['Nome do Produto'] ?? null,
    type: s.Tipo ?? null, // não definido
    position: s['Posição'] ?? null,
    system: s.Sistema ?? null,
    color: s['Côr'] ?? null,
    material: s.Material ?? null,
    obs: s['Observações'] ?? null,
    fuel: s['Combustível'] ?? null, // não definido
    chassi: s.Chassi ?? null, // não definido
    year_fab: s['AnoMod.Fab'] ?? null, // não definido
    year_model: s['AnoMod.model'] ?? null, // não definido
    quality: s['Qualidade da Marca'] ?? null,
    price: s['Preço'] ?? null, // não definido
    group: s['Grupo'] ?? null,
    // others
    branch_type: s.Seguimento ?? null,
    provider_description: s['Descrição do Fornecedor'] ?? null,
    depth: s['Espessura (mm)'] ?? null,
    provider_name: s['Fornecedor Nome Fantasia'] ?? null,
    ncm: s['NCM Código Fiscal'] ?? null,
    sku: s['SKU Código Fornecedor '] ?? null,
    eam: s['EAM Código Barras'] ?? null,
    oem: s['OEM Código Original'] ?? null,
    mpn: s['MPN Código Marca'] ?? null,
    brand: s['Marca do Produto'] ?? null,
    purchase_packaging: s['Embalagem de Compra'] ?? null,
    place: s['Local do Produto'] ?? null,
    unity: s.Unidade ?? null,
    cost_price: s['Preço Custo'] ?? null,
    sale_price: s['Preço Venda'] ?? null,
    description: s['Descrição Título do Produto'] ?? null,
    type_mlb: s['Tipo MLB'] ?? null,
    variations_mlb: s['Variações MLB'] ?? null,
    assignments_mlb: s['Atribuições MLB'] ?? null,
    category_id_mlb: s['ID da Categorias MLB'] ?? null,
  };
};

export const formatSend = (file: any) => {
  const sheet: any = Object.entries(file)[0][1];
  const products = [];
  let nulableLines = 0;

  let i = 0;
  for (const line of sheet) {
    if (nulableLines > 3) break;
    if (verifyIfIsNullLine(line)) {
      nulableLines++;
    } else {
      products[i] = {
        group: line.Grupo ?? null,
        subgroup: line.SubGrupo ?? null,
        synonyms: getSynonyms(line['Sinônimos']),
        product: getProductsData(line),
      };
    }
    i++;
  }
  return products;
};
