import { ButtonPrimary } from "@/components/UI/buttons"
import { Paragraph } from "@/components/UI/texts"
import { EditIcon } from "@/components/icons/Edit"
import { UserInfo } from "@/interfaces/UserInfo"
import Link from "next/link"

export const InfoUser = ({ User }: { User: UserInfo }) => {
    return (
        <>
            <div className="overflow-x-auto pt-4">
                <table className="table">
                    <thead>
                        <tr className="dark:text-white">
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="dark:text-white">
                            <th>Nombre de usuario</th>
                            <td>
                                <Paragraph text={User.username} />
                            </td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr className="dark:text-white">
                            <th>Email</th>
                            <td>
                                <Paragraph text={User.email} />
                            </td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr className="dark:text-white">
                            <th>Numero de celular</th>
                            <td>
                                <Paragraph text={User.cellphone} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-full flex justify-center pt-5">
                <Link href="profile/updateInfo">
                    <ButtonPrimary>
                        <EditIcon className="iconBg" />
                        Editar perfil
                    </ButtonPrimary>
                </Link>
            </div>
        </>
    )
}
