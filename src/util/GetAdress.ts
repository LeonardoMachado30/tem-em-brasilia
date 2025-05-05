export interface IAdress {
    "cep": string,
    "logradouro": string,
    "complemento": string,
    "unidade": string,
    "bairro": string,
    "localidade": string,
    "uf": string,
    "estado": string,
    "regiao": string,
    "ibge": string,
    "gia": string,
    "ddd": string,
    "siafi": string
}

export async function GetAdress(cep: string): Promise<IAdress> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    return await response.json();
}