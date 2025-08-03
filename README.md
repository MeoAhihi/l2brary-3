# L2brary-Client

L2brary-3 là một dự án quản lý thành viên, lớp học, kỹ năng... được xây dựng với [Next.js](https://nextjs.org) (App Router), React, TypeScript và pnpm.

## Mục lục

- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Luồng hoạt động](#luồng-hoạt-động)
- [Khởi động & phát triển](#khởi-động--phát-triển)
- [Ghi chú](#ghi-chú)

## Cấu trúc dự án

```
src/
  app/           # Các route, layout, page chính
  components/     # Component UI & logic tái sử dụng
  constants/      # Dữ liệu tĩnh, cấu hình
  hooks/          # Custom React hooks
  lib/            # Helper, util, export excel...
  providers/      # Context, provider cho global state
  styles/         # CSS toàn cục
public/           # Ảnh, SVG, asset tĩnh
```

## Luồng hoạt động

1. **Entry Point**: Trang chính ở `src/app/page.tsx`.
2. **Routing**: Next.js App Router, mỗi thư mục trong `src/app/` là một route.
3. **Layout**: Sử dụng `layout.tsx` cho từng route để chia sẻ UI (sidebar, header...)
4. **Component**: Page sử dụng các component từ `src/components/`.
5. **Data**: Dữ liệu tĩnh từ `src/constants/` hoặc fetch động.
6. **State**: Quản lý state toàn cục qua provider trong `src/providers/`.

## Khởi động & phát triển

### Cài đặt

```bash
pnpm install
# hoặc npm install
```

### Chạy dev server

```bash
pnpm dev
# hoặc npm run dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để xem kết quả.

### Build & Production

```bash
pnpm build
pnpm start
```

## Ghi chú

- Sử dụng Next.js App Router (không dùng pages/)
- React hiện đại (function component, hook)
- Tổ chức theo tính năng, dễ mở rộng
- Dùng pnpm để quản lý package

---
