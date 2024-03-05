export interface User {
  id?: string;
  email?: string;
  password?: string;
  nome?: string;
  nome_mae?: string;
  data_nascimento?: string;
  cpf?: string;
  rg?: string;
  cep?: string;
  uf?: string;
  logradouro?: string;
  cidade?: string;
  complemento?: string;
  numero?: string;
  telefone?: string;
  celular?: string;
  createdAt?: Date;
  level?: string;
  levelName?: string;
  associate_to?: string;
  commission?: string;
  tags?: string;
  dependent?: {
    nome?: string;
    telefone?: string;
    rg?: string;
    cpf?: string;
  };
  doc_cpf?: {
    name?: string;
    url?: string;
    status?: string;
  };
  doc_residence?: {
    name?: string;
    url?: string;
    status?: string;
  };
  doc_company?: {
    name?: string;
    url?: string;
    status?: string;
  };
  status?: boolean;
  financial_status?: string;
}
