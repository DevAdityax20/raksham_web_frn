import { useTranslation } from 'react-i18next'
import { MoreHorizontal } from 'lucide-react'
import { usePopup } from '../../hooks/usePopup.js'

// Three-dot overflow menu. items: [{ id, label, danger? }]; onSelect receives the item id.
function RowMenu({ label, items, onSelect }) {
  const { t } = useTranslation()
  const [open, setOpen, ref] = usePopup()

  return (
    <div className="row-menu" ref={ref}>
      <button
        type="button"
        className="row-menu__btn"
        aria-label={label ?? t('app.library.moreActions')}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <MoreHorizontal aria-hidden="true" />
      </button>
      {open && (
        <ul className="chat-menu chat-menu--right" role="menu">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                role="menuitem"
                className={item.danger ? 'is-danger' : undefined}
                onClick={() => {
                  setOpen(false)
                  onSelect(item.id)
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RowMenu
