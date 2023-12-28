const ListPage = ({ actions, deleteAction }) => {
  return (
    <div>
      <h2>List Page</h2>
      <ul>
        {actions.map((action) => (
          <li key={action.id}>
            {action.title} - {action.genre} - {action.date}
            <button onClick={() => deleteAction(action.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
