
export default Image = (props) => { 
    console.log('image props---->', props);
    return (
        <img
        src={props.src}
        alt={props.alt}
        className={props.className}
        />
    );
}