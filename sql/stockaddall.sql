SELECT TOP (1000) [ID]
      ,[ItemCode]
      ,[Category]
      ,[Position]
      ,[Type]
      ,[Description]
      ,[Price(unit)]
      ,[Quantity]
      ,[VendorName]
      ,[Remark]
      ,[CreateDate]
      ,[UpdateBy]
      ,[del_flg]
      ,[link_video]
  FROM [MED_IoTO].[dbo].[tbl_StockAddAll_Tong]


--update [dbo].[tbl_StockAddAll_Tong]
--set link_video = 'https://www.youtube.com/watch?v=A40GvpEGqpg'
where  itemcode = 'IoT-ST-001'