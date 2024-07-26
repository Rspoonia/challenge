import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

export default function Home() {
  const { user } = useAuth();
  const getUser = useUser();
  const [loading, setLoading] = useState(true);
  
  const fetchData = async () => {
    await getUser();
    setLoading(false);
  }
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="container" style={{marginTop: '6rem'}}>
      <h2>
        <div className="row">
          <div className="mb-12">
            { loading ? (
              "Loading..."
            )
              : user?.user_data ? (
           
                 <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #dddddd', fontSize: '16px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '12px', border: '1px solid #dddddd' }}>First Name</th>
                        <th style={{ padding: '12px', border: '1px solid #dddddd' }}>Last Name</th>
                        <th style={{ padding: '12px', border: '1px solid #dddddd' }}>Email</th>
                        <th style={{ padding: '12px', border: '1px solid #dddddd' }}>ETH Wallet</th>
                        <th style={{ padding: '12px', border: '1px solid #dddddd' }}>ETH Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ backgroundColor: '#f9f9f9' }}>
                        <td style={{ padding: '12px', border: '1px solid #dddddd' }}>{user.user_data.first_name}</td>
                        <td style={{ padding: '12px', border: '1px solid #dddddd' }}>{user.user_data.last_name}</td>
                        <td style={{ padding: '12px', border: '1px solid #dddddd' }}>{user.user_data.email}</td>
                        <td style={{ padding: '12px', border: '1px solid #dddddd' }}>{user.user_data.eth_wallet}</td>
                        <td style={{ padding: '12px', border: '1px solid #dddddd' }}>{user.wallet.eth_balance}</td>
                    </tr>
                </tbody>
              </table>
            ) : (
              "Please login first"
            )}
          </div>
        </div>
      </h2>
    </div>
  );
}
