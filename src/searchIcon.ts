import axios from "axios";
export default async function searchIcon(name: string, iconType: string = "") {
  const res = await axios({
    url: "https://www.iconfont.cn/api/icon/search.json",
    method: "post",
    headers: {
      cookie:
        "ctoken=We6B-NrGV4smtUeMUpFyrZAa; xlly_s=1; cna=IsgtIYAyfT4CAX1vG7udSSGk; tfstk=gC8rHGtzrwvjtRejPKQUQZHGtqQR-wk6-e6CtBAhNTXuPzwH0L9dFMGdPH5h3pICETGR8MvHETAWOvUUtaLXVy6SewRHCwksCVg6wQQR-AM__FvlSwfnR9mfqwSa-vDsCVgjqSbEUA9I_ln2i6BcZ6XhEjucttqlZpXlm-fN6wXHKpb0n65a-_fltI4cH6bhKpbngZXATwXHKwc2iUAXZB4V1gcm98PsM55R4OAl3yRJu_jz2QX4-yY20gWg5tz3-E5yT2MCkz0Nn3tHPZYonRQD6n9lgNuUTs-wiafypVURrCADxg8EA5Bp0Ix10nFSws8y_e5Nm-cPpU9y8gLiCrBk0ELFPnMz59IHcUI9Px4PShd5PHvmtyXem6jyhJCmFj8p4JqFqsCVCjl4wDSjbbT4s2ZLvibOgOG5NkEdqxzQ4FzavkI-4sWsN_1..",
    },
    data: `q=${encodeURIComponent(name)}${
      iconType ? `&${iconType}=1` : ""
    }&sortType=updated_at&page=1&pageSize=54&sType=&fromCollection=-1&fills=&t=1755765290878&ctoken=We6B-NrGV4smtUeMUpFyrZAa`,
  });
  return res.data.data.icons;
}
