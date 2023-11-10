/*
    Script per inserire 5 elementi nella tabella dbo.Elements che genera i riquadri a video.
    Possono avere qualsiasi nome.
*/

MERGE INTO dbo.Elements tgt
USING (
    VALUES 
        ('Elemento 1'),
        ('Elemento 2'),
        ('Elemento 3'),
        ('Elemento 4'),
        ('Elemento 5')
) AS src (Name)
ON tgt.Name = src.Name
WHEN MATCHED THEN
    UPDATE SET
        tgt.Name = src.Name
WHEN NOT MATCHED THEN
    INSERT (Name)
    VALUES (src.Name);