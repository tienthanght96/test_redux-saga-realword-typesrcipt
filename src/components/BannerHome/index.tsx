import * as React from 'react';

interface Props{
  token?: string
}

const Banner: React.SFC<Props> = ({ token }: Props) => {
  
  if (token) {
    return null;
  }

  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">
          Conduit
        </h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  );
};

export default Banner;
