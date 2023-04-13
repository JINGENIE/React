import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {SERVERIP} from '../../CommonUtil';
import { Link } from 'react-router-dom';

function ScoreList(props) {
    const [scoreList, setScoreList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadData() {
            const url = SERVERIP + "/score/list";
            await axios
                .get(url)
                .then((res) => {
                    setScoreList(res.data);
                    setLoading(true);
                    console.log(ScoreList);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        loadData();
    }, []);
    return (
        <div className='container'> 
            <h1>
                점수 목록
            </h1>
            <div
                className="input-group mb-3"
                style={{
                    marginTop: "2vh"
                }}>
                <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown">
                    선택하세요
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a className="dropdown-item" href="#">제목</a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">내용</a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">제목+내용</a>
                    </li>
                </ul>
                <input type="text" className="form-control" placeholder="Search"/>
                <button className="btn btn-secondary" type="submit">Go</button>
            </div>

            <table className="table table-hover ">
                <thead className="table-secondary">
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>국어</th>
                        <th>영어</th>
                        <th>수학</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            loading===true?
                            scoreList.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{item.ID}</td>
                                        <td><Link to={"/score/view/"+item.ID}>{item.STUDENT_NAME}</Link></td>
                                        <td>{item.KOR}</td>
                                        <td>{item.ENG}</td>
                                        <td>{item.MAT}</td>
                                    </tr>
                                )
                            })
                            :""
                        }
                </tbody>
            </table>
            <div>
            <Link className='btn btn-danger' to="/score/write">점수입력</Link>
            </div>
        </div>
    )
}
export default ScoreList;