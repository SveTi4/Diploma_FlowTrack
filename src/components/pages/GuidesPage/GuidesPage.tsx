import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { PageHeader } from '../../molecules';
import {
  GuidesWrapper,
  Nav,
  MenuList,
  MenuItem,
  MenuButton,
  ContentWrapper,
  MarkdownContent
} from './GuidesPage.styles';

const guides = [
  { title: 'Начало работы', file: '/src/guides/getting-started.md' },
  { title: 'Работа с задачами', file: '/src/guides/tasks.md' },
  { title: 'Работа с проектами', file: '/src/guides/projects.md' },
  { title: 'FAQ', file: '/src/guides/faq.md' },
];

export const GuidesPage = () => {
  const [selected, setSelected] = useState(0);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(guides[selected].file)
      .then(res => res.text())
      .then(setContent);
  }, [selected]);

  return (
    <>
      <PageHeader title="Гайды" />
      <GuidesWrapper>
        <Nav>
          <MenuList>
            {guides.map((g, i) => (
              <MenuItem key={g.title}>
                <MenuButton
                  $active={i === selected}
                  onClick={() => setSelected(i)}
                >
                  {g.title}
                </MenuButton>
              </MenuItem>
            ))}
          </MenuList>
        </Nav>
        <ContentWrapper>
          <MarkdownContent>
            <ReactMarkdown>{content}</ReactMarkdown>
          </MarkdownContent>
        </ContentWrapper>
      </GuidesWrapper>
    </>
  );
}; 