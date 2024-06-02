import React, { useEffect } from "react";
import axios from "axios";
import { MouseEvent, Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function CartPage(props) {
  const [getItemCount, setItemCount] = useState(0);
  const [getSaldoUser, setSaldoUser] = useState(0.0);
  const [getTotal, setTotal] = useState(0.0);
  const [getItems, setItems] = useState([]);
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const mfauzan = JSON.parse(localStorage.getItem("UserLogin_namaUser"));
  const headhunter = mfauzan.data;
  const getUser = async () => {
    axios
      .get("http://localhost:1466/user/get", {
        params: {
          // Mengakses data dengan menggunakan titik, seperti contoh chamber.nama_user
          namaUser: headhunter.nama_user,
        },
      })
      .then((res) => {
        let isValid = res.data.message;
        if (isValid) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
        console.log(mfauzan);
        // Mengakses data-data lain dari JSON yang sudah diberikan

        setSaldoUser(headhunter.saldo_user);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
      });
  };
  getUser();

  const handlePay = () => {
    setSaldoUser(headhunter.saldo_user);
    axios
      .post("http://localhost:1466/user/pay", {
        totalBelanja: getTotal,
      })
      .then((res) => {
        console.log(headhunter.saldo_user);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setSaldoUser(headhunter.saldo_user);
    axios
      .get("http://localhost:1466/shop/get")
      .then((res) => {
        console.log(res.data);
        setItems(res.data.data);
        let a = 0;
        for (let i = 0; i < res.data.data.length; i++) {
          a += res.data.data[i].harga_media;
          setTotal(a);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div>
        <div className="mb-3">
          <h1 className="text-white font-bold">Cart List</h1>
        </div>
        {getItems.length === 0 && (
          <p className="text-red-600 text-2xl bg-white">
            Anda Belum Memasukkan Barang Apapun!
          </p>
        )}
        <div className="flex justify-center">
          <ul className="list-group list-group-horizontal justify-center shadow-md rounded-xl  mb-4 w-75  xl:grid-cols-5   ">
            {getItems.map((item, index) => (
              <li
                className={
                  selectedIndex === index
                    ? "list-group-item active"
                    : "list-group-item"
                }
                key={item.name}
                onClick={() => {
                  setSelectedIndex(index);
                }}
              >
                <img src={item.gambar_media} className="h-56" />
                <div className="align-bottom">
                  <p className="text-nowrap font-semibold">{item.nama_album}</p>
                  <p className="text-nowrap">{item.nama_artis}</p>
                  <p className="text-nowrap font-bold">{item.jenis_media}</p>
                  <p className="text-red-500 font-bold">
                    {item.harga_media} ({item.jumlah})
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul className="list-group list-group-horizontal shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-75 p-3 justify-between bg-white ">
        <div>
          <div className="text-2xl flex font-bold text-center ">
            Payment Information
          </div>
          <div className="text-2xl flex">Saldo Anda : {getSaldoUser} </div>
          <div className="text-2xl flex">Total belanja : {getTotal} </div>
        </div>
        <div className="flex space-x-4">
          <button
            className="flex justify-start rounded bg-green-500 text-white text-opacity-5 items-center font-bold max-h-12 "
            title="Confirm Payment"
            onClick={handlePay}
          >
            Confirm Payment
          </button>
          <button
            className="flex justify-start rounded bg-red-600 text-white text-opacity-5 items-center font-bold  max-h-12 "
            title="Cancel"
            onClick={() => {
              toast.error("Masuk Ke Page Pembayaran");
              setTimeout(() => {
                navigate("/home");
              }, 2000); // Tambahkan delay agar user bisa melihat toast sebelum dialihkan
            }}
          >
            X
          </button>
        </div>
      </ul>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default CartPage;
