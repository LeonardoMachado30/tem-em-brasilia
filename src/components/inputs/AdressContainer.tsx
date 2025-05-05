import {ContainerInput} from "@/components/inputs/ContainerInput";
import {Input} from "@/app/register/input";
import React from "react";
import {GetAdress} from "@/util/GetAdress";

export function AdressContainer({register, disabled}: { register: any, disabled: boolean }) {

    const getAdress = async (cep: string) => {
        console.log(cep);
        const response = await GetAdress(cep);
    }

    return (
        <ContainerInput title="Localização"
                        classNameChildren="flex items-center justify-between">
            <Input
                label="cep"
                register={register}
                type="text"
                placeholder="CEP"
                onBlur={(e) => getAdress(e.target.value)
                }
                required
                className="max-w-[140px]"
                disabled={disabled}
            />
            <Input
                label="uf"
                register={register}
                type="text"
                placeholder="UF"
                onBlur={(e) => getAdress(e.target.value)
                }
                required
                className="max-w-[140px]"
                disabled={disabled}
            />
            <Input
                label="adress"
                register={register}
                type="text"
                placeholder="Endereço"
                required
                disabled={disabled}
            />
            <Input
                label="adressComplement"
                register={register}
                type="text"
                placeholder="Complemento"
                disabled={disabled}
            />

        </ContainerInput>
    )
}