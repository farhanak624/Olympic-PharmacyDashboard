import React from "react";

function Button({ img, name, cliked, bordercolur }) {
  return (
    <button
      className={`flex gap-1 items-center  ${
        bordercolur == name ? "border-b border-yellow-500 text-navblue" : "text-white"
      }`}
      onClick={() => cliked(name)}
    >
      {img}
      {name}
    </button>
  );
}

export default Button;
