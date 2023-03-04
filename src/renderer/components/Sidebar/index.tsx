import { NavLink } from 'react-router-dom';
import { CloudArrowUp } from 'phosphor-react';
import { SidebarContainer, SidebarItem } from './styles';

export function Sidebar() {
  return (
    <SidebarContainer>
      <NavLink to="/" title="Home">
        <SidebarItem>
          <CloudArrowUp size={42} />
          <span>Buckets</span>
        </SidebarItem>
      </NavLink>
    </SidebarContainer>
  );
}
