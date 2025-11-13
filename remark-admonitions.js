import { visit } from 'unist-util-visit';

/** Admonition Plugin – voll kompatibel mit Astro + ESM + remark-directive */
export default function remarkAdmonitionCompatible() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' &&
        ['tip', 'warning', 'danger', 'note', 'info', 'caution'].includes(node.name)
      ) {
        const data = node.data || (node.data = {});
        const type = node.name;
        const titleText = type.charAt(0).toUpperCase() + type.slice(1);

        // Hauptelement: <div class="admonition admonition-tip">
        data.hName = 'div';
        data.hProperties = {
          className: [`admonition`, `admonition-${type}`],
        };

        // Prüfen, ob erstes Kind ein Paragraph ist (enthält oft den Titel)
        const firstChild = node.children[0];
        let titleContent = [];

        if (firstChild?.type === 'paragraph') {
          const textContent = firstChild.children
            .filter((child) => child.type === 'text')
            .map((child) => child.value)
            .join('')
            .trim();

          if (textContent && !textContent.includes('\n')) {
            titleContent = firstChild.children;
            // Entferne den ersten Absatz, da er jetzt Titel wird
            node.children.shift();
          }
        }

        // Falls kein Titel aus Inhalt → Standardtitel
        if (titleContent.length === 0) {
          titleContent = [{ type: 'text', value: titleText }];
        }

        // Titel-Element erstellen: <p class="admonition-title">TIP</p>
        const titleNode = {
          type: 'paragraph',
          data: {
            hName: 'p',
            hProperties: {
              className: 'admonition-title',
            },
          },
          children: titleContent,
        };

        // Titel vorne einfügen
        node.children.unshift(titleNode);
      }
    });
  };
}
