import axios, { Axios } from "axios";
import "./Homepage.css";
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Path  from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState([]);

  const [data, setItemdata] = useState([]);
  const [update, setUpdate] = useState([]);
  const [pages, setPageData] = useState([]);
  const [changePage, setchangePage] = useState("1");
  const [searchinput, setsearchinput] = useState("");
  const [delet, setAlldelet] = useState("");
  const [users, setUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [path, setPath] = useState("");
  const [userId, setUserId] = useState(null);

   useEffect(() => {
  

   }, [])

  // ++++++++++++++++++++++++++++++++++

  // for filter method

  const search = () => {
    axios
      .get(`http://localhost:9002/serchPhoneNumber/${searchinput}`)
      .then((res) => {
        console.log("profile pic", res.data.profile);
        setPageData(res.data);
      });
  };

  // +++++++++++++++++++++++++++++++++++++ change page

  useEffect(() => {
    
    axios
      .post(`http://localhost:9002/paginationData?pageNo=${changePage}&size=5`)
      .then((res) => {
        console.log();
        setPageData(res.data);
      });
  }, [changePage]);
  const handlePageClick = (data) => {
    let page = data.selected + 1;
    setchangePage(page);
    setPage();
    console.log("page:", page);
  };

  // ++++++++++++++++++++++++++++

  // +++++++++++++++++++++++++++ update

  const Update = (name, email, address, phone) => {
    setEmail(email);

    setName(name);

    setAddress(address);
    setPhone(phone);
  };
  const UpdateUser = () => {
    const updateData = {
      name: name,
      email: email,
      Phone: phone,
      address: address,
    };
    axios.put(`http://localhost:9002/UpdateUserData`, updateData);
  };

  // Delet Function
  function Delet() {
    axios.delete("http://localhost:9002/Delet").then((res) => {
      setAlldelet(res.data);
    });
  }

  // +++++++++++++++++++++++++++

  // +++++++++++++++++++homepage bg

  return (
    <div>
      <form>
        <input
          type="text"
          onChange={(e) => setsearchinput(e.target.value)}
          placeholder="Search.."
          name="search"
        ></input>
        <button type="button" onClick={() => search()}>
          Search
        </button>
      </form>
      <h1 className=" bg-info text-dark">Wellcome Your Page</h1>

      <table className="table table-striped table-primary">
        <thead>
          <tr>
            <th scope="col">name</th>

            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">address</th>
            <th scope="col">image</th>

            <th scope="col">Action</th>
          </tr>
        </thead>

        {pages.map((users) => (
          <tr>
            <td>{users.name}</td>
            <td>{users.email}</td>
            <td>{users.phone}</td>
            <td>{users.address}</td>
            <td>
              <img
                src={`http://localhost:9002/${users.profile.path}`}
                className="tableimage"
                alt="my"
              ></img>
            </td>

            <td>
              <button
                type="button"
                // value={edit}
                onClick={() => {
                  Update(users.name, users.email, users.addres, users.phone);
                  setShow((isOpen) => !isOpen);
                }}
                className="edit btn btn-warning btn-sm"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                type="button"
                value={delet}
                onClick={() => Delet(users.email)}
                className="delete btn "
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          pageCount={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-right"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </table>

      <div>
        {show ? (
          <div className="editbar">
            <label>Name: </label>
            <input
              type="text"
              className="l1"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <br />
            <label> email: </label>
            <input
              type="email"
              className="l2"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />{" "}
            <br />
            <label> Phone: </label>
            <input
              type="text"
              className="l3"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <br />
            <label> address : </label>
            <input
              type="text"
              className="l4"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />{" "}
            <br />
            <button className="l5" onClick={() => UpdateUser()}>
              Update User
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Home;
