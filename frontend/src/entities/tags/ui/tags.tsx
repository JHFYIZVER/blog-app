import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { TagsType, TagType } from "../lib/types";
import Link from "next/link";

const Tags = () => {
  const tags: TagsType = [
    { id: "pouhawEPH9UIDFSDFW9PU9834", name: "Спорт" },
    { id: "pouhawEPH9UIWSDFS9PU9834", name: "Чита" },
    { id: "pouhawEPH9UIW9PU9834", name: "Дом" },
    { id: "pouhawEPH9DFSSDFDFUIW9PU9834", name: "Пупка" },
    { id: "pouhawEPH9UIWSSDFDFS9PU9834", name: "Дупка" },
  ];
  return (
    <Card className="bg-sidebar">
      <CardHeader>
        <CardTitle>Популярные теги</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tags.map((tag: TagType) => (
          <div
            className="flex items-center gap-3 transition-all rounded-xl hover:bg-accent-foreground/20"
            key={tag.id}
          >
            <Link
              className="w-full py-3"
              href={`/?tag=${tag.name}`}
            >
              <b className="px-3">#</b>{tag.name}
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Tags;
