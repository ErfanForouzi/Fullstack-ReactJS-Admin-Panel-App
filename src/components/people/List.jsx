import { useEffect, useState } from "react";
import { Link } from "react-router";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import {Divider, LoadingSkeleton,Space,Table} from "@/ui";
import Remove from "./Remove";
import {connect} from "react-redux"
import { setPeopleLoading,setPeople, getPeople } from "@/redux/actions/person";



 function List({people,getItems,loading,person}) {
  // const [people, setPeople] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    getItems();
  }, []);


  const columns = [
    { title: "ID", key: "id" },
    { title: "Name", key: "name" },
    {
      title: "Address",
      key: "address",
      render: (f, r) => `${f.city}-${f.street}-${r.phone}`,
    },
    {
      key: "action",
      render: (f, r) => (
        <Space>
          <Link to={`/people/${r.id}`}>
          <EyeOutlined />
        </Link>
          <Link to={`/people/${r.id}/edit`}>
          <EditOutlined />
        </Link>
        
        {/* <Remove id={r.id} getData={getData}/> */}
        <Remove id={r.id}/>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <LoadingSkeleton />
      ) : people.length < 1 ? (
        <div>کاربری یافت نشد</div>
      ) : (
        <>
        {person.id && <h4>آخرین کاربر بازدید شده : {person.name}</h4>}
        <Divider/>
        <Table data={people} columns={columns} />
        </>
      )}
    </div>
  );
}

function mapStateToProps(state){
  return {
    people:state.people,
    loading:state.peopleLoading,
    person:state.person
  }
}
function mapDispatchToProps(dispatch){
  return {
    setPeople:(data)=>dispatch(setPeople(data)),
    setLoading:(loading)=>dispatch(setPeopleLoading(loading)),
    getItems:()=>dispatch(getPeople())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(List)