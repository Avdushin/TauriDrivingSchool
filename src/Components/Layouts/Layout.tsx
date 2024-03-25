//? Layout Component - содержит компоненты виджетов по-умолчанию, которые необходимо отображать на каждой странице
import { Outlet } from 'react-router-dom';
import { Container } from '@mantine/core';
import { SideBar } from '../Sidebar/SideBar';

//? showSidebar - регулирует нужно ли рендерить компонент <Sidebar />
//? noContainer - регулирует нужно ли рендерить <Container></Container>
// (По умолчанию <Sidebar> и <Container> отрисовываются)
/* Пример использоавния:
   <Layout showSidebar={false} noContainer={true}/>
*/
const Layout = ({ showSidebar = true, noContainer = false }) => {
  return (
    <>
      {showSidebar && <SideBar />}
      {noContainer ? (
        <Outlet />
      ) : (
        <Container>
          <Outlet />
        </Container>
      )}
    </>
  );
};

export { Layout };