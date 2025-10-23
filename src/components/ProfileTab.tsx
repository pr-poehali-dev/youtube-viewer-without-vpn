import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface ProfileTabProps {
  email: string;
  nickname: string;
  avatar: string | null;
  onSave: (email: string, nickname: string, avatar: string | null) => void;
}

export default function ProfileTab({ email, nickname, avatar, onSave }: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editEmail, setEditEmail] = useState(email);
  const [editNickname, setEditNickname] = useState(nickname);
  const [editAvatar, setEditAvatar] = useState<string | null>(avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onSave(editEmail, editNickname, editAvatar);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditEmail(email);
    setEditNickname(nickname);
    setEditAvatar(avatar);
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setEditAvatar(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Профиль</h2>
        <p className="text-muted-foreground">Управляйте настройками своего профиля</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center overflow-hidden cursor-pointer group"
            onClick={handleAvatarClick}
          >
            {editAvatar ? (
              <img src={editAvatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <Icon name="User" size={40} className="text-white" />
            )}
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="Camera" size={24} className="text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{nickname}</h3>
            <p className="text-muted-foreground">{email}</p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="w-full sm:w-auto">
            <Icon name="Edit" size={18} className="mr-2" />
            Редактировать профиль
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Фото профиля</Label>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAvatarClick}
                  className="flex-1"
                >
                  <Icon name="Upload" size={18} className="mr-2" />
                  Загрузить фото
                </Button>
                {editAvatar && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleRemoveAvatar}
                  >
                    <Icon name="Trash2" size={18} />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname">Никнейм</Label>
              <Input
                id="nickname"
                type="text"
                value={editNickname}
                onChange={(e) => setEditNickname(e.target.value)}
                placeholder="Введите никнейм"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="Введите email"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave} className="flex-1 sm:flex-initial">
                <Icon name="Check" size={18} className="mr-2" />
                Сохранить
              </Button>
              <Button onClick={handleCancel} variant="outline" className="flex-1 sm:flex-initial">
                <Icon name="X" size={18} className="mr-2" />
                Отмена
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="font-semibold mb-4">Статистика</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Clock" size={18} className="text-primary" />
                <span className="text-sm text-muted-foreground">История</span>
              </div>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Heart" size={18} className="text-primary" />
                <span className="text-sm text-muted-foreground">Избранное</span>
              </div>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}