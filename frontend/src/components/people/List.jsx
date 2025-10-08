import { useEffect, useState } from "react";
import { Link } from "react-router";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import {Divider, LoadingSkeleton,Space,Table} from "@/ui";
import Remove from "./Remove";
import {connect} from "react-redux"
import { setPeopleLoading,setPeople, getPeople } from "@/redux/actions/person";
import CustomLink from "@/ui/CustomLink";



 function List({people,getItems,loading,person}) {


  useEffect(() => {
    getItems();
  }, []);


  const columns = [
    { title: "ID", key: "id" },
    { title: "نام کاربری", key: "username" },
    { title: "نقش", key: "role" },
    { title: "تاریخ ایجاد", key: "createdAt" },
    {
      key: "action",
      render: (f, r) => (
        <Space>
          <Link to={`/people/${r.id}`}>
          <EyeOutlined />
        </Link>
          <CustomLink role={'ADMIN'} to={`/people/${r.id}/edit`}>
          <EditOutlined />
        </CustomLink>
        
       <CustomLink role={'ADMIN'}>
       <Remove id={r.id} getData={getItems}/>
       </CustomLink>
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
        {person.id && <h4>آخرین کاربر بازدید شده : {person.username}</h4>}
        <Divider/>
        <Table data={people} columns={columns} key={'id'} />
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