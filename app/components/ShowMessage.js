function ShowMessage({message}) { 
    return (
      <table className="table table-striped">      
        <tbody>
        <tr>
          <td>{message}</td>      
        </tr>
        </tbody>
      </table>
    );
  }

export default ShowMessage  