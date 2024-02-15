import './App.css';
import fontStyle from './fontStyle.css';
import './css/style.css';
import Routes from '././Routes';

const addButtonProperty = {
  name: 'Adding',
  color: 'white',
  backgroundColor: '#4096f',
  type: 'primary',
};
const deleteButtonProperty = {
  name: 'Delete',
  color: 'black',
  backgroundColor: 'white',
  type: 'default',
};

const addButtonHandler = (record) => {
  console.log('adding...');
  // console.log(record.target.value);
  console.log(record);
};
const deleteButtonHandler = () => {
  console.log('deleting....');
};
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button
          buttonProps={addButtonProperty}
          buttonHandler={addButtonHandler}
          isCallbackData={record}
        />
        <Button
          buttonProps={deleteButtonProperty}
          buttonHandler={deleteButtonHandler}
        />
      </Space>
    ),
  },
];
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
    tags: ['loser'],
  },
];
function App() {
  return <Routes />;
}

export default App;
