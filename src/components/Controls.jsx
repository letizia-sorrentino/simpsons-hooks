const Controls = (props) => {
    const { onSearchInput, onLikeInput, searchInput, errors } = props;
    return (
      <>
        <input className="controls" value={searchInput} onInput={onSearchInput} type="text" />
        <p>{errors}</p>
        <select onInput={onLikeInput}>
          <option value=""></option>
          <option value="liked">Liked</option>
          <option value="notLiked">Not Liked</option>
        </select>
      </>
    );
  };
  
  export default Controls;
  