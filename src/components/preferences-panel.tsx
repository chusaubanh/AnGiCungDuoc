import { useEffect, useState } from 'react';
import { SlidersHorizontal, Plus, Trash2, Search, Sparkles, Check, AlertTriangle, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { foods } from '@/lib/foods';
import { foodName, priceLabel, type Language } from '@/lib/i18n';
import { emptyProfile, validateProfile, type PoolProfile } from '@/lib/personal-pool';
import type { Preferences } from '@/hooks/use-preferences';

export function PreferencesPanel({
  preferences: a,
  language,
  disabled,
  variant = 'header',
}: {
  preferences: Preferences;
  language: Language;
  disabled: boolean;
  variant?: 'header' | 'inventory';
}) {
  const vi = language === 'vi';
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<PoolProfile>(emptyProfile);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'builtIn' | 'custom'>('builtIn');

  const [editing, setEditing] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('50');
  const [veg, setVeg] = useState(false);
  const [notice, setNotice] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setDraft(a.profile);
  }, [a.profile]);

  const resetForm = () => {
    setEditing(null);
    setName('');
    setPrice('50');
    setVeg(false);
  };

  function add() {
    try {
      const item = { id: editing || crypto.randomUUID(), name: name.trim(), price: Number(price), veg };
      const next = validateProfile({
        ...draft,
        custom: editing ? draft.custom.map((f) => (f.id === editing ? item : f)) : [...draft.custom, item],
      });
      updateDraft(next);
      resetForm();
      setNotice('');
    } catch {
      setNotice(
        vi
          ? 'Tên món: 1–60 ký tự, giá: 10–500 nghìn, tối đa 50 món.'
          : 'Dish name: 1–60 chars, price: 10–500k VND, max 50 dishes.'
      );
    }
  }

  const dirty = JSON.stringify(draft) !== JSON.stringify(a.profile);
  const updateDraft = (next: PoolProfile) => {
    setDraft(next);
    a.save(next);
  };

  return (
    <>
      <button
        className={variant === 'inventory' ? 'customize-food-button' : 'preferences-button'}
        disabled={disabled}
        onClick={() => {
          setDraft(a.profile);
          setNotice('');
          setConfirmDelete(false);
          setOpen(true);
        }}
        aria-label={variant === 'inventory' ? (vi ? 'Tuỳ chỉnh món ăn' : 'Customize food') : (vi ? 'Món của tôi' : 'My dishes')}
      >
        <SlidersHorizontal size={variant === 'inventory' ? 15 : 16} />
        {variant === 'inventory' ? (
          <>
            <span className="customize-full">{vi ? 'Tuỳ chỉnh thực đơn' : 'Customize menu'}</span>
            <span className="customize-short">{vi ? 'Tuỳ chỉnh' : 'Customize'}</span>
          </>
        ) : (
          <span>{vi ? 'Thực đơn của tôi' : 'My menu'}</span>
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="preferences-dialog" showCloseButton={true}>
          <div className="pref-dialog-header">
            <div className="pref-dialog-icon">
              <Sparkles size={20} />
            </div>
            <div>
              <DialogTitle className="pref-title">{vi ? 'Tùy Chỉnh Thực Đơn' : 'Customize Menu'}</DialogTitle>
              <DialogDescription className="pref-desc">
                {vi ? 'Bật/tắt món mặc định hoặc thêm món quen theo sở thích (tự lưu trên máy).' : 'Enable/disable dishes or add personal favorites (saved locally).'}
              </DialogDescription>
            </div>
          </div>

          <div className="pool-tabs">
            <button
              className={`tab-item ${tab === 'builtIn' ? 'selected' : ''}`}
              onClick={() => setTab('builtIn')}
            >
              <span>{vi ? 'Món có sẵn' : 'Catalog'}</span>
              <span className="tab-badge">{foods.length - draft.disabled.length}</span>
            </button>
            <button
              className={`tab-item ${tab === 'custom' ? 'selected' : ''}`}
              onClick={() => setTab('custom')}
            >
              <span>{vi ? 'Món tự thêm' : 'Custom'}</span>
              <span className="tab-badge">{draft.custom.length}/50</span>
            </button>
          </div>

          <div className="pool-body">
            <fieldset>
              {tab === 'builtIn' ? (
                <>
                  <div className="search-wrap">
                    <Search size={16} className="search-icon" />
                    <input
                      className="pool-search"
                      placeholder={vi ? 'Tìm món theo tên…' : 'Search dishes by name…'}
                      aria-label={vi ? 'Tìm món' : 'Search dishes'}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="pool-list">
                    {foods
                      .filter((f) => foodName(f, language).toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                      .map((f) => {
                        const isChecked = !draft.disabled.includes(f.image);
                        return (
                          <label className={`pool-row ${isChecked ? 'is-active' : 'is-inactive'}`} key={f.image}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) =>
                                updateDraft({
                                  ...draft,
                                  disabled: e.target.checked
                                    ? draft.disabled.filter((id) => id !== f.image)
                                    : [...draft.disabled, f.image],
                                })
                              }
                            />
                            <span className="dish-name">
                              {foodName(f, language)}
                              {f.veg ? <span className="veg-pill">🌱 {vi ? 'Chay' : 'Veg'}</span> : ''}
                            </span>
                            <small className="dish-price">{priceLabel(f.price, language)}</small>
                          </label>
                        );
                      })}
                  </div>
                  <div className="pool-toolbar-action">
                    <button
                      type="button"
                      className="subtle-button"
                      onClick={() => updateDraft({ ...draft, disabled: [] })}
                    >
                      <RefreshCw size={14} />
                      <span>{vi ? 'Bật lại tất cả món mặc định' : 'Enable all catalog dishes'}</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="custom-form">
                    <div className="form-group">
                      <label>{vi ? 'Tên món ăn / quán quen' : 'Dish name / Restaurant'}</label>
                      <input
                        placeholder={vi ? 'vd: Cơm tấm Ba Ghiền' : 'e.g. Broken rice'}
                        value={name}
                        maxLength={60}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>{vi ? 'Giá (nghìn đồng)' : 'Price (1k VND)'}</label>
                      <input
                        type="number"
                        min="10"
                        max="500"
                        step="1"
                        inputMode="numeric"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="form-row-bottom">
                      <label className="inline-check">
                        <input type="checkbox" checked={veg} onChange={(e) => setVeg(e.target.checked)} />
                        <span>🌱 {vi ? 'Món chay' : 'Vegetarian'}</span>
                      </label>
                      <div className="form-actions">
                        {editing && (
                          <button type="button" className="cancel-edit-btn" onClick={resetForm}>
                            {vi ? 'Huỷ sửa' : 'Cancel'}
                          </button>
                        )}
                        <button type="button" className="pool-primary" onClick={add}>
                          <Plus size={16} />
                          <span>{editing ? (vi ? 'Cập nhật' : 'Update') : vi ? 'Thêm món' : 'Add dish'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pool-list custom-dishes-list">
                    {draft.custom.length === 0 && (
                      <div className="empty-custom-pool">
                        <p>
                          {vi
                            ? 'Chưa có món tự thêm nào. Hãy thêm quán quen hoặc món tủ của bạn ở ô bên trên!'
                            : 'No custom dishes yet. Add your favorite restaurants and dishes above!'}
                        </p>
                      </div>
                    )}
                    {draft.custom.map((f) => (
                      <div className="pool-row custom-item" key={f.id}>
                        <button
                          type="button"
                          className="edit-dish-btn"
                          onClick={() => {
                            setEditing(f.id);
                            setName(f.name);
                            setPrice(String(f.price));
                            setVeg(f.veg);
                          }}
                        >
                          <span className="dish-name">{f.name}</span>
                          {f.veg && <span className="veg-pill">🌱 {vi ? 'Chay' : 'Veg'}</span>}
                        </button>
                        <small className="dish-price">{priceLabel(f.price, language)}</small>
                        <button
                          type="button"
                          className="delete-dish-btn"
                          aria-label={`${vi ? 'Xóa' : 'Remove'} ${f.name}`}
                          onClick={() => {
                            updateDraft({ ...draft, custom: draft.custom.filter((item) => item.id !== f.id) });
                            if (editing === f.id) resetForm();
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </fieldset>
          </div>

          <div className="pool-save">
            <small>
              <Check size={14} className="check-icon" />
              {foods.length - draft.disabled.length + draft.custom.length} {vi ? 'món đang kích hoạt' : 'active dishes'} ·{' '}
              {dirty ? (vi ? 'Đang lưu…' : 'Saving…') : vi ? 'Đã tự động lưu vào máy' : 'Saved locally'}
            </small>
          </div>

          <div className="preferences-bottom">
            <button
              type="button"
              className="subtle-link-btn"
              onClick={async () => {
                const p = await a.reload();
                if (p) setDraft(p);
              }}
            >
              <RefreshCw size={13} />
              <span>{vi ? 'Đọc lại cookie' : 'Reload cookies'}</span>
            </button>
            <button
              type="button"
              className="subtle-danger-btn"
              onClick={() => setConfirmDelete(!confirmDelete)}
            >
              <Trash2 size={13} />
              <span>{vi ? 'Xóa dữ liệu đã lưu' : 'Clear saved data'}</span>
            </button>
          </div>

          {confirmDelete && (
            <div className="delete-confirm">
              <div className="delete-confirm-text">
                <AlertTriangle size={16} />
                <span>{vi ? 'Bạn có chắc muốn đặt lại toàn bộ cài đặt về mặc định?' : 'Reset all preferences to default?'}</span>
              </div>
              <div className="delete-confirm-actions">
                <button type="button" className="confirm-btn" onClick={async () => { if (await a.remove()) setOpen(false); }}>
                  {vi ? 'Xác nhận xóa' : 'Confirm Reset'}
                </button>
                <button type="button" className="cancel-btn" onClick={() => setConfirmDelete(false)}>
                  {vi ? 'Hủy' : 'Cancel'}
                </button>
              </div>
            </div>
          )}

          {(a.error || notice) && (
            <p className="preferences-message" role="status">
              {a.error || notice}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
