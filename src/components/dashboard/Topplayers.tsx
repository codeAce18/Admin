import React from 'react'
import Avartar from '../../assets/images/pirate/user1.png'
import Coin from '../../assets/images/pirate/standingdollarcoin.svg'
import { useAppContext } from '../../context/index.tsx'
const Topplayers = () => {
    const { topplayers } = useAppContext();
    return (
        <div>
            <span className='fs-6 m-3'>TOP PLAYERS</span>
            <div className="table-responsive mt-3">
                {
                    (topplayers && topplayers.length > 0) &&
                    <table className="table text-nowrap table-borderless m-bg-secondary">
                        <thead>
                            <tr>
                                <th className='p-3' scope="col"></th>
                                <th className='p-3' scope="col">Username</th>
                                <th className='p-3' scope="col">Coin Balance</th>
                                <th className='p-3' scope="col">Level</th>
                                <th className='p-3' scope="col">Level Name</th>
                                <th className='p-3' scope="col">Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                topplayers.map((player, index) =>
                                    <tr key={index}>
                                        <th className='' scope="row">
                                            <div className='d-flex justify-content-center w-100'>
                                                <span className="avatar avatar-md avatar-rounded me-2 offline">
                                                    <img src={player.level_image_url ? `${process.env.REACT_APP_API_URL}${player.level_image_url}` : Avartar} alt="img" />
                                                </span>
                                            </div>
                                        </th>
                                        <td>{player.username ?? ""}</td>
                                        <td>
                                            <img src={Coin} alt="img" className='rounded-3' width={20} />
                                            {player.coin_balance ?? ""}
                                        </td>
                                        <td>{player.level ?? 1}</td>
                                        <td>{player.level_name ?? 1}</td>
                                        <td><span className="badge bg-outline-primary">{index + 1}</span></td>
                                    </tr>
                                )
                            }


                        </tbody>
                    </table>
                }

            </div>
        </div>

    )
}

export default Topplayers