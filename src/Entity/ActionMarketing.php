<?php

namespace App\Entity;

use App\Repository\ActionMarketingRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ActionMarketingRepository::class)
 */
class ActionMarketing
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"campagne"})
     */
    private $id;
    /**
     * @var Campagne|null
     * @ORM\ManyToOne(targetEntity=Campagne::class, inversedBy="actionMarketings")
     */
    private $campagne;



    /**
     * @Groups({"campagne"})
     * @ORM\ManyToOne(targetEntity=Task::class, inversedBy="actionMarketings")
     */
    private $task;

    /**
     * @Groups({"campagne"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $nomAction;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"campagne"})
     */
    private $impact;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"campagne"})
     */
    private $level;

    public function getId(): ?int
    {
        return $this->id;
    }



    public function getTask(): ?Task
    {
        return $this->task;
    }

    public function setTask(?Task $task): self
    {
        $this->task = $task;

        return $this;
    }

    public function getNomAction(): ?string
    {
        return $this->nomAction;
    }

    public function setNomAction(?string $nomAction): self
    {
        $this->nomAction = $nomAction;

        return $this;
    }

    public function getImpact(): ?int
    {
        return $this->impact;
    }

    public function setImpact(?int $impact): self
    {
        $this->impact = $impact;

        return $this;
    }

    public function getLevel(): ?string
    {
        return $this->level;
    }

    public function setLevel(?string $level): self
    {
        $this->level = $level;

        return $this;
    }

    public function __toString()
    {
       return strval($this->nomAction);
    }

    /**
     * @return Campagne|null
     */
    public function getCampagne(): ?Campagne
    {
        return $this->campagne;
    }

    /**
     * @param Campagne|null $campagne
     * @return ActionMarketing
     */
    public function setCampagne(?Campagne $campagne): ActionMarketing
    {
        $this->campagne = $campagne;
        return $this;
    }



}
