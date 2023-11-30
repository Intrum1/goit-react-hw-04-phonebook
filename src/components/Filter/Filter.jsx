import css from "../Filter/Filter.module.css";


export const Filter =({onChange }) => {  


    return (<div className={css.container}>
      <form name="search" className={css.form}>
        <label className={css.label}>
          Find contacts by name
          <input 
            className={css.input}
            type="text"
            onChange={evt => onChange(evt.currentTarget.value)}
          //   value={Filter.props.filter}
          >
          </input>
        </label>
      </form>
    </div>);
  }