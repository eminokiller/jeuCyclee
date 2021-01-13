<?php

namespace App\Entity;

use App\Repository\JoueurRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=JoueurRepository::class)
 */
class Joueur extends User
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    protected $id;
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $Nom;

    /**
     * @ORM\ManyToOne(targetEntity=Equipe::class, inversedBy="joueurs")
     */
    private $equipe;



    public function getNom(): ?string
    {
        return $this->Nom;
    }

    public function setNom(?string $Nom): self
    {
        $this->Nom = $Nom;

        return $this;
    }

    public function __construct()
    {
        $this->password = 'change_me';
        $this->roles = ['ROLE_USER'];
    }

    public function getEquipe(): ?Equipe
    {
        return $this->equipe;
    }

    public function setEquipe(?Equipe $equipe): self
    {
        $this->equipe = $equipe;

        return $this;
    }


    public function setPassword(String $password): User
    {
        return parent::setPassword('change_me'); // TODO: Change the autogenerated stub
    }

    public function getId(): ?int
    {
        return parent::getId(); // TODO: Change the autogenerated stub
    }


}
