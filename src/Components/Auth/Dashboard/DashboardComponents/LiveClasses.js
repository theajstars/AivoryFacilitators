import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button, Table } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

import LiveClassCalendarImage from "../../../../Assets/IMG/LiveClassCalendar.png";
import { baseURL } from "../../../../App";

export default function LiveClasses() {
  const navigate = useNavigate();
  const token = Cookies.get("ud");
  const [trainings, setTrainings] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseURL}/facilitator/getTrainings`, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        const { auth, trainings } = res.data;
        if (auth) {
          setTrainings(trainings);
        }
      });
  }, []);
  const trainingColumns = [
    {
      title: "Title",
      dataIndex: "trainingTitle",
      key: "trainingTitle",
      render: (e) => {
        return <>{e.substring(0, 50)}...</>;
      },
    },
    {
      title: "View",
      dataIndex: "trainingID",
      key: "trainingID",
      render: (e) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              navigate(`/training/${e}`);
            }}
          >
            View
          </Button>
        );
      },
    },
  ];
  return (
    <div className="dashboard-screen-container">
      <div className="live-classes-container">
        <Table dataSource={trainings} columns={trainingColumns} />
      </div>
    </div>
  );
}
