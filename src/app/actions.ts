"use server";

export async function onDelete(user: UserDataProps) {
  alert(`On delete pressed for ${user}`);
}

export async function onEdit(user: UserDataProps) {
  alert(`On Edit pressed for ${user}`);
}
