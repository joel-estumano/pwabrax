export interface Management {
    id?: string;
    created_at?: Date;
    status?: string;
    request?: string;
    operator?: string;
    reason?: string;
    discount?: string;
    products?: Array<{
      category?: string;
      operator?: string;
      lineNumber?: string;
      iccid?: string;
      note?: string;
      type?: string;
      qtd?: string;
    }>;
  }
  