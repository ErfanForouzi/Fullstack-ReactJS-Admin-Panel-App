import { useMemo } from "react";
import { Table as AntTable } from "antd";
import { toLocalDateString } from "@/tools/toLocalDate";

export default function Table({ data, columns, rowKey = "id",...props }) {
  const transformedDataWithCreatedAt = data?.map(item=>{
    if(item.createdAt){
      item.createdAt = new Date(item.createdAt).toLocaleDateString("fa-IR") 
    }
   if(item.title){
   item.title =  item.title.slice(0,20) + '...'
   }
   if(item.text){
   item.text =  item.text.slice(0,25) + '...'
   }
    return item
  })
  const newColumns = useMemo(() => {
    return columns.map((c) =>{
      return { dataIndex: c.key, ...c }
    });
  }, [columns]);
  return <AntTable dataSource={transformedDataWithCreatedAt} columns={newColumns} rowKey={rowKey} {...props} />;
}
