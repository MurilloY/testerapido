export interface Estado {
    sigla: string;
    nome: string;
    cidades: string[];
}

export interface ReturnCities {
    estados: Estado[];
    
}