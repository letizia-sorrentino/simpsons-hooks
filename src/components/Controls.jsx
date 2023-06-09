const Controls = (props) => {
    const { onSearchInput, onLikeInput, SearchInput } = props;
    return (
      <>
        <input className="controls" value={SearchInput.name} onInput={onSearchInput} type="text" />
        <p>{errors && errors.name}</p>
        <select onInput={onLikeInput}>
          <option value=""></option>
          <option value="liked">Liked</option>
          <option value="notLiked">Not Liked</option>
        </select>
      </>
    );
  };
  
  export default Controls;
  