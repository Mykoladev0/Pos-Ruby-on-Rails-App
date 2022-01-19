import styled from "styled-components";

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    margin-bottom: 0;
  }

  header {
    display: flex;
    align-items: center;

    span {
      margin-left: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    align-items: flex-start;

    header {
      flex-direction: column;
      align-items: flex-start;

      span {
        margin-left: 0rem;
        margin-bottom: 0.5rem;
      }
    }
  }
`;
