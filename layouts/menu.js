export default {
  items: [{
    name: "Generator",
    url: "/generator",
    icon: "ni ni-archive-2 text-green",
    role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
    solutions: "",
    child: [],
  },
  // GENERAL

  {
    // isParent: true,
    name: "GENERAL",
    icon: "ni ni-app text-green",
    role: [],
    solutions: "",
    child: [{
      name: "Dashboard",
      url: "/general/dashboard",
      role: [],
      solutions: "",
      child: [],
    },
    {
      name: "Data Produk",
      url: "/general/myproduct",
      role: [],
      solutions: "",
      child: [],
    },
      // {
      //   name: "Notifikasi",
      //   url: "/general/notifikasi",
      //   role: [],
      //   solutions: "",
      //   child: [],
      // },
      // {
      //   name: "Info Broadcast",
      //   url: "/general/info_broadcast",
      //   role: [],
      //   solutions: "",
      //   child: [],
      // },
      // {
      //   name: "Berita & Info",
      //   url: "/general/berita_info",
      //   role: [],
      //   solutions: "",
      //   child: [],
      // },
      // {
      //   name: "FAQ",
      //   url: "/general/faq",
      //   role: [],
      //   solutions: "",
      //   child: [],
      // },
    ],
  },
  {
    // isParent: true,
    name: "DATA",
    role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
    solutions: "",
    icon: "ni ni-money-coins text-green",
    child: [{
      name: "Data Company",
      url: "/admin_server/company_office",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
      solutions: "",
      child: [],
    },
    {
      name: "Server Monitoring",
      url: "/admin_server/server_monitoring_office",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
      solutions: "",
      child: [],
    },
    // {
    //     name: "Data Super Admin",
    //     url: "/admin_server/data_super_admin_office",
    //     role:[],solutions: "",
    //     child: [],
    // },
    {
      name: "Data Admin",
      url: "/admin_server/data_admin_office",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
      solutions: "",
      child: [],
    },
    {
      name: "Data User",
      url: "/admin_server/data_user_office",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
      solutions: "",
      child: [],
    },
    {
      name: "Data Notifikasi",
      url: "/admin_server/data_Notifikasi_office",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
      solutions: "",
      child: [],
    },
    {
      name: "Data  Broadcast",
      url: "/admin_server/data_broadcast_office",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
      solutions: "",
      child: [],
    },
    {
      name: "Berita & Info",
      url: "/admin_server/berita_info_office",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
      solutions: "",
      child: [],
    },
    {
      name: "Data FAQ",
      url: "/admin_server/data_faq_office",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
      solutions: "",
      child: [],
    },
    {
      name: "Data Gambar",
      url: "/admin_server/data_gambar_office",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
      solutions: "",
      child: [],
    },
    {
      name: "Data Wilayah",
      url: "/admin_server/data_wilayah_office",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
      solutions: "",
      child: [],
    },
    {
      name: "Template Pipeline",
      url: "/admin_server/crm_pipeline",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
      solutions: "",
      child: [],
    },
    ],
  },

  // Transaction

  {
    // isParent: true,
    name: "TRANSACTION",
    icon: "ni ni-credit-card text-green",
    role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_FINANCE'],
    solutions: "TRANSACTION",
    child: [{
      name: "Saldo Admin",
      url: "/transaction/saldo_admin",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_FINANCE'],
      solutions: "TRANSACTION",
      child: [],
    },
    {
      name: "Saldo Merchant",
      url: "/transaction/saldo_merchant",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_FINANCE'],
      solutions: "TRANSACTION",
      child: [],
    },
    {
      name: "Saldo User",
      url: "/transaction/saldo_user",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_FINANCE'],
      solutions: "TRANSACTION",
      child: [],
    },
    {
      name: "Saldo Mesin",
      url: "/transaction/saldo_mesin",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_FINANCE'],
      solutions: "TRANSACTION",
      child: [],
    },
    {
      name: "Menu Kasir",
      url: "/transaction/menu_kasir",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_FINANCE'],
      solutions: "TRANSACTION",
      child: [],
    },
    {
      name: "Data Transaksi",
      url: "/transaction/data_transaksi",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_FINANCE'],
      solutions: "TRANSACTION",
      child: [],
    },
    {
      name: "Data Mutasi",
      url: "/transaction/data_mutasi",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_FINANCE'],
      solutions: "TRANSACTION",
      child: [],
    },
    ],
  },

  // CHAT

  {
    // isParent: true,
    name: "CHAT",
    icon: "ni ni-archive-2 text-green",
    role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_CS'],
    solutions: "",
    child: [{
      name: "Cs Support",
      url: "/chat",
      // icon: "ni ni-archive-2 text-green",
      role: [],
      solutions: "",
      child: [],
    },],
  },

  // CRM

  {
    // isParent: true,
    name: "KATALIS PIPELINE",
    icon: "ni ni-single-02 text-green",
    role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_IMPLEMENTATOR', 'ROLE_SALES', 'ROLE_ADMIN_PARTNER'],
    solutions: "CRM",
    child: [{
      name: "Data Customer",
      url: "/crm/crm_customer",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_IMPLEMENTATOR', 'ROLE_SALES', 'ROLE_ADMIN_PARTNER'],
      solutions: "CRM",
      child: [],
    },
    {
      name: "Invoice",
      url: "/crm/crm_invoice",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_IMPLEMENTATOR', 'ROLE_ADMIN_PARTNER'],
      solutions: "CRM",
      child: [],
    },
    {
      name: "Data Member",
      url: "/crm/crm_member_temp",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_IMPLEMENTATOR', 'ROLE_SALES', 'ROLE_ADMIN_PARTNER'],
      solutions: "CRM",
      child: [],
    },
    {
      name: "Preview Member",
      url: "/crm/crm_preview_member",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_IMPLEMENTATOR', 'ROLE_SALES', 'ROLE_ADMIN_PARTNER'],
      solutions: "CRM",
      child: [],
    },
    {
      name: "Card Mapping",
      url: "/crm/crm_card_mapping",
      role: [],
      solutions: "CRM",
      child: [],
    },
    {
      name: "Ticket Support",
      url: "/crm/crm_ticket",
      role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_IMPLEMENTATOR', 'ROLE_SALES', 'ROLE_ADMIN_PARTNER'],
      solutions: "CRM",
      child: [],
    },
    ],
  },

  // WEBSITE

  {
    // isParent: true,
    name: "WEBSITE",
    icon: "ni ni-world-2 text-green",
    role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_WEBSITE'],
    solutions: "WEBSITE",
    child: [
      // {
      //   name: "Data Content",
      //   url: "/website/website_content",
      //   role: [],
      //   solutions: "WEBSITE",
      //   child: [],
      // },
      {
        name: "Data Menu",
        url: "/website/website_menu",
        role: [],
        solutions: "WEBSITE",
        child: [],
      },
      {
        name: "Data Page",
        url: "/website/website_page",
        role: [],
        solutions: "WEBSITE",
        child: [],
      },
      {
        name: "Data Form",
        url: "/website/website_form",
        role: [],
        solutions: "WEBSITE",
        child: [],
      },
      {
        name: "Data Table",
        url: "/website/website_table",
        role: [],
        solutions: "WEBSITE",
        child: [],
      },
      {
        name: "Data Video",
        url: "/website/website_video",
        role: [],
        solutions: "WEBSITE",
        child: [],
      },
      {
        name: "Data Gallery",
        url: "/website/website_gallery",
        role: [],
        solutions: "WEBSITE",
        child: [],
      },
      {
        name: "Data Berita",
        url: "/website/website_news",
        role: [],
        solutions: "WEBSITE",
        child: [],
      },
      {
        name: "Data Slider",
        url: "/website/website_slider",
        role: [],
        solutions: "WEBSITE",
        child: [],
      },
    ],
  },

  // POS

  {
    // isParent: true,
    name: "POS",
    icon: "ni ni-cart text-green",
    role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_POS'],
    solutions: "STORE",
    child: [{
      name: "Product",
      url: "/kasir/product",
      role: [],
      solutions: "STORE",
      child: [],
    },
    {
      name: "Kasir",
      url: "/kasir",
      role: [],
      solutions: "STORE",
      child: [],
    },
    {
      name: "POS 1",
      url: "/pos",
      role: [],
      solutions: "STORE",
      child: [],
    },
    ],
  },

  // ABSEN

  {
    // isParent: true,
    name: "ABSEN",
    icon: "ni ni-active-40 text-green",
    role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_ABSEN'],
    solutions: "ATTENDANCE",
    child: [{
      name: "Data Pengguna",
      url: "/absen/absen_pengguna",
      role: [],
      solutions: "ATTENDANCE",
      child: [],
    },
    {
      name: "Data Mesin Absen",
      url: "/absen/absen_mesin",
      role: [],
      solutions: "ATTENDANCE",
      child: [],
    },
    {
      name: "Data Shift",
      url: "/absen/absen_shift",
      role: [],
      solutions: "ATTENDANCE",
      child: [],
    },
    {
      name: "Data Absensi",
      url: "/absen/data_absensi",
      role: [],
      solutions: "ATTENDANCE",
      child: [],
    },
      // {
      //   name: "Laporan Absensi",
      //   url: "/absen/absen_laporan",
      //   role: [],
      //   solutions: "ATTENDANCE",
      //   child: [],
      // },
      // {
      //   name: "Data Cuti",
      //   url: "/absen/absen_cuti",
      //   role: [],
      //   solutions: "ATTENDANCE",
      //   child: [],
      // },
    ],
  },

  // AKSES

  {
    // isParent: true,
    name: "AKSES",
    icon: "ni ni-key-25 text-green",
    role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_AKSES'],
    solutions: "ACCESS",
    child: [{
      name: "Data Pengguna",
      url: "/akses/akses_pengguna",
      role: [],
      solutions: "ACCESS",
      child: [],
    },
    {
      name: "Data Mesin Akses",
      url: "/akses/akses_mesin",
      role: [],
      solutions: "ACCESS",
      child: [],
    },
    ],
  },
  ],
};