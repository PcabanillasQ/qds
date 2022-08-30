import "./styles.css";

type LoaderProps = {
  color?: string;
};

const defaultColor = "#0dcaf0";

const Loader: React.FC<LoaderProps> = ({ color = defaultColor }) => (
  <div className="spinner">
    {new Array(2).fill(null).map((_, i) => (
      <div
        key={i}
        className={`spinner__circle${++i}`}
        style={{ backgroundColor: color }}
      ></div>
    ))}
  </div>
);

export default Loader;
