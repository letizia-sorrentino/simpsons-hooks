const Controls = (props) => {
    const { onSearchInput, onLikeInput } = props;
    return (
      <>
        <input className="controls" onInput={onSearchInput} type="text" />
        <select onInput={onLikeInput}>
          <option value=""></option>
          <option value="liked">Liked</option>
          <option value="notLiked">Not Liked</option>
        </select>
      </>
    );
  };
  
  export default Controls;
  