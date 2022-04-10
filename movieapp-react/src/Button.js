import PropTypes from "prop-types";
import styled from "./Button.module.css";

const Button = ({ text }) => {
    return <button className={styled.btn}>{text}</button>;
};

// propTypes: props의 타입 검사를 위한 도구,
// 유효하지 않은 값이 전달되면, JavaScript 콘솔을 통해 경고문 노출
Button.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Button;
